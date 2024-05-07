const express = require('express')
const db = require('mongoose')
const app = express();
const roleRouter = require('./routes/role');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}
))
app.use("/api/role", roleRouter )
app.use("/api/auth", authRouter )
app.use("/api/user", userRouter )

// Response handler middleware
app.use((obj, req, res, next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Somthing Went Wrong"
    return res.status(statusCode).json({
        success: [200,201,204].some(a=> a === obj.status) ? true : false,
        status:statusCode,
        message:message,
        data:obj.data
    })
})

const connectMongoDb = async () => {
    try {
        await db.connect(process.env.DB_URL)
        console.log("connected to database")
    }catch (error) {
        console.log(error)
    }
}

app.listen(8000, () => {
    connectMongoDb();
    console.log("connected to backend...");
})