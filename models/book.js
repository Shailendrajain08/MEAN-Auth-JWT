const mongoose = require('mongoose');
const Schema = require('mongoose');

const BookSchema = mongoose.Schema (
    {
        title: {
            type:String,
            require:true
        },
        isbn13: {
            type:String,
            require:true
        },
        price: {
            type:String,
            require:true
        },
        image: {
            type:String,
            require:true
        },
        url: {
            type:String,
            require:true
        },
        author: {
            type:String,
            require:true
        },
        details: {
            type:String,
            require:true
        }
    }
);

module.exports = mongoose.model("Book", BookSchema)