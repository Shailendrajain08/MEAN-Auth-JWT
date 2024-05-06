const User = require("../models/User")
const Role = require("../models/Role")
const bcrypt = require('bcryptjs')
const CreateError  = require("../utils/error");
const CreateSuccess = require("../utils/success");
const jwt = require('jsonwebtoken');

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

module.exports = {
    createUser : createUser,
    loginUser : loginUser,
    createAdmin : createAdmin
}