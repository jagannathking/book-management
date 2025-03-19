const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: String
    },
    genre: {
        type: String
    },
    Publication_Year: {
        type: String
    },
    book_image:{
      type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

})

const Book = mongoose.model("book", bookSchema)
module.exports = Book;