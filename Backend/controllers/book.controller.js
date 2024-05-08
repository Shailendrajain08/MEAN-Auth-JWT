const Book = require('../models/book')
const CreateError = require('../utils/error');
const CreateSuccess = require('../utils/success');


const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        return next(CreateSuccess(200, "All Books Fetched", books));
    } catch (error) {
        return next(CreateError(500, "Internal Server Error!"));
    }
}

module.exports = {
    getBooks : getBooks
}