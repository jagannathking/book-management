const Book = require('../models/book.model');
const cloudinary = require('../utils/cloudinary'); // Ensure you have a Cloudinary utility
const upload = require('../middlewares/multer'); // Middleware for handling image uploads

// Create Book
const createBook = async (req, res) => {
    try {
        const { title, author, genre, Publication_Year } = req.body;
        const createdBy = req.user._id;

        if (!title || !author || !genre || !Publication_Year || !req.file) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Upload book image to Cloudinary
        const uploadedResponse = await cloudinary.uploader.upload(req.file.path, {
            folder: "books",
        });

        const newBook = new Book({
            title,
            author,
            genre,
            Publication_Year,
            book_image: uploadedResponse.secure_url,
            createdBy
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
            const uploadedResponse = await cloudinary.uploader.upload(req.file.path, {
                folder: "books",
            });
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

        await book.deleteOne();
        res.status(200).json({ message: "Book deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again later", error: error.message });
    }
};

module.exports = { createBook, getAllBooks, getBooks, updateBook, deleteBook };
