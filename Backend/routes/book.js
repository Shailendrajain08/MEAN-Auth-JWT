const express = require('express');
const router = express.Router();
const {getBooks} = require('../controllers/book.controller')

router.get("/", getBooks)

module.exports = router;