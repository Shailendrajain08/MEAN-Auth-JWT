const express = require('express')
const db = require('mongoose')
const app = express();
const dotenv = require('dotenv')
dotenv.config();

const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("connected to database")
    }catch (error) {

    }
}

// app.use("")

const { default: mongoose } = require('mongoose');

app.listen(8000, () => {
    connectMongoDb();
    console.log("connected to backend...");
})