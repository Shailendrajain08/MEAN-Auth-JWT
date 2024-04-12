const User = require("../models/User")
const Role = require("../models/Role")
const bcrypt = require('bcryptjs')

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
    return res.status(200).send("User Registered Successfully!")
}

const loginUser = async(req, res, next) => {
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(404).send("User Not Found!")
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return res.status(404).send("Password is Incorrect!")
        }
        return res.status(200).send("login Successfull!")
    }catch(error){
        return res.status(500).send("Something Went Wrong!")
    }
}

module.exports = {
    createUser : createUser,
    loginUser : loginUser
}