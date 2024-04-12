const User = require("../models/User")
const Role = require("../models/Role")
const bcrypt = require('bcryptjs')
const CreateError  = require("../utils/error");
const CreateSuccess = require("../utils/success");

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
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return next(CreateError(404, "User Not Found!"));
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return next(CreateError(404, "Password is Incorrect!"));
        }
        return next(CreateSuccess(200, "Login Successfull!"))
    }catch(error){
        return next(CreateError(500, "Something Went Wrong!!!"));
    }
}

module.exports = {
    createUser : createUser,
    loginUser : loginUser
}