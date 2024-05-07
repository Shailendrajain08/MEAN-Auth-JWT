const User = require("../models/User")
const Role = require("../models/Role")
const bcrypt = require('bcryptjs')
const CreateError  = require("../utils/error");
const CreateSuccess = require("../utils/success");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const UserToken = require('../models/UserToken')

const createUser = async (req, res, next) => {
    const role = await Role.find({role:"User"});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: hashPassword,
        roles: role,
    });

    await newUser.save();
    return next(CreateSuccess(200, "User Registered Successfully!"))
}

const loginUser = async(req, res, next) => {
    try{
        const user = await User.findOne({email:req.body.email})
        .populate("roles", "role");
        const { roles } = user;
        if(!user){
            return next(CreateError(404, "User Not Found!"));
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return next(CreateError(404, "Password is Incorrect!"));
        }
        const token = jwt.sign(
            {id:user._id, isAdmin: user.isAdmin, roles: roles},
            process.env.JWT_SECRET
        )
        res.cookie("access_token", token, {httpOnly:true})
        .status(200)
        .json({
            status: 200,
            message: 'Login Success',
            data: user
        })
        // return next(CreateSuccess(200, "Login Successfull!"))
    }catch(error){
        return next(CreateError(500, "Something Went Wrong!!!"));
    }
}

const createAdmin = async (req, res, next) => {
    const role = await Role.find({});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        isAdmin: true,
        password: hashPassword,
        roles: role,
    });

    await newUser.save();
    return next(CreateSuccess(200, "Admin Registered Successfully!"))
}

const sendEmail = async (req, res, next) => {
    const email = req.body.email;
    const user = await User.findOne({email:{$regex: '^'+email+'$', $options: 'i'}});
    if(!user){
        return next(CreateError(404, "User not found to reset the email!"))
    }
    const payload = {
        email : user.email
    }
    const expiryTime = 300;
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: expiryTime});

    const newToken = new UserToken({
        userId : user._id,
        token: token
    });

    const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "shailendrajain.javaventures@gmail.com",
            pass: "mslo bvbh fxli auce"
        }
    });

    let mailDetails = {
        from: "shailendrajain.javaventures@gmail.com",
        to: email,
        subject: "Reset Password!",
        html: `
        <html>
<head>
    <title>Password Reset Request</title>
</head>
<body>
    <h1>Password Reset Requies</h1>
    <p>Dear ${user.firstName} ${user.lastName},</p>
    <p>We have receive a request to reset your Password for your account with BookMyBook. To complete the password reset process, please click on the button below:</p>
    <a href=${process.env.LIVE_URL}/reset/${token}><button style="background-color: #4CAF50; color:white; padding:14px 20px; border:none; cursor:pointer; border-radius:4px; ">Reset Password</button></a>
    <p>Please not that this link is only valid for a 5 minutes, If you did not request a password reset, Please disregard this message.</p>
    <p>Thank You</p>
    <p>BookMyBook Team</p>
</body>
</html>
        `
    };
    mailTransporter.sendMail(mailDetails, async(err, data) => {
        if(err) {
            console.log(err)
            return next(CreateError(500, "Something went wrong while sending the email"))
        }else{
            await newToken.save();
            return next(CreateSuccess(200, "Mail send successfully!"))
        }
    })
}

module.exports = {
    createUser : createUser,
    loginUser : loginUser,
    createAdmin : createAdmin,
    sendEmail : sendEmail
}