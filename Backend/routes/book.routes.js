const express = require('express');
const router = express.Router();
const { createBook, getAllBooks, getBooks, updateBook, deleteBook, searchBooks } = require('../controllers/book.controller');
const upload = require('../middlewares/multer');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');


router.post('/create', upload.single('book_image'), authMiddleware, createBook);
router.get('/all', authMiddleware, getAllBooks);
router.get('/my-books', authMiddleware, adminMiddleware, getBooks);
router.put('/update/:id', upload.single('book_image'), authMiddleware, adminMiddleware, updateBook);
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteBook);
// Route to search books by title, author, or genre (open to all)
router.get("/search", authMiddleware, adminMiddleware, searchBooks);

module.exports = router;
