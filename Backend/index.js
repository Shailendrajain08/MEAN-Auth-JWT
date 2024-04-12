const express = require('express')
const db = require('mongoose')
const app = express();
const roleRouter = require('./routes/role')
const authRouter = require('./routes/auth')
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json())

app.use("/api/role", roleRouter)
app.use("/api/auth", authRouter)

const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("connected to database")
    }catch (error) {

    }
}

const { default: mongoose } = require('mongoose');

app.listen(8000, () => {
    connectMongoDb();
    console.log("connected to backend...");
})