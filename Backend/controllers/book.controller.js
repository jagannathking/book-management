const Book = require("../models/book.model");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middlewares/multer");

// Create Book
const createBook = async (req, res) => {
    try {
        const { title, author, genre, Publication_Year } = req.body;
        const createdBy = req.user._id;

        if (!title || !author || !genre || !Publication_Year || !req.file) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Upload book image to Cloudinary
        const uploadedResponse = await cloudinary.uploader.upload(req.file.path, { folder: "books" });

        const newBook = new Book({
            title,
            author,
            genre,
            Publication_Year,
            book_image: uploadedResponse.secure_url,
            createdBy,
        });

        await newBook.save();
        res.status(201).json({ message: "Book created successfully", book: newBook });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again later", error: error.message });
    }
};

// Get all books (Admin)
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again later", error: error.message });
    }
};

// Get books by specific admin
const getBooks = async (req, res) => {
    try {
        const books = await Book.find({ createdBy: req.user._id });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again later", error: error.message });
    }
};

// Update book
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, genre, Publication_Year } = req.body;
        let book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Update book details
        if (title) book.title = title;
        if (author) book.author = author;
        if (genre) book.genre = genre;
        if (Publication_Year) book.Publication_Year = Publication_Year;

        // If a new image is uploaded, update it in Cloudinary
        if (req.file) {
            // Delete old image from Cloudinary
            const oldImageUrl = book.book_image;
            const oldImagePublicId = oldImageUrl.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`books/${oldImagePublicId}`);

            // Upload new image
            const uploadedResponse = await cloudinary.uploader.upload(req.file.path, { folder: "books" });
            book.book_image = uploadedResponse.secure_url;
        }

        await book.save();
        res.status(200).json({ message: "Book updated successfully", book });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again later", error: error.message });
    }
};

// Delete book
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Delete book image from Cloudinary
        const imageUrl = book.book_image;
        const imagePublicId = imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`books/${imagePublicId}`);

        await book.deleteOne();
        res.status(200).json({ message: "Book deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again later", error: error.message });
    }
};

// Search books by title (case-insensitive) & filter by author/genre
const searchBooks = async (req, res) => {
    try {
        const { title, author, genre } = req.query;
        let query = {};

        if (title) query.title = { $regex: title, $options: "i" }; // Case-insensitive search
        if (author) query.author = { $regex: author, $options: "i" };
        if (genre) query.genre = { $regex: genre, $options: "i" };

        const books = await Book.find(query);

        if (books.length === 0) {
            return res.status(404).json({ message: "No books found matching your search criteria." });
        }

        res.status(200).json(books);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again later", error: error.message });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    getBooks,
    updateBook,
    deleteBook,
    searchBooks,
};
