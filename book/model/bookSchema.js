const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  number_of_pages: {
    type: Number,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
