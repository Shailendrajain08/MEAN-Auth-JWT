const mongoose = require('mongoose');
const Schema = require('mongoose')


const TokenSchema = mongoose.Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            require: true,
            ref: "User"
        },
        token:{
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expire: 300
        }
    }
);

module.exports = mongoose.model("Token", TokenSchema)