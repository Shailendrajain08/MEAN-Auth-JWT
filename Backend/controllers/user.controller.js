const User = require('../models/User')
const CreateError = require("../utils/error");
const CreateSuccess = require("../utils/success");

const getAllUser = async (req, res, next) => {
    try{
        const users = await User.find();
        return next(CreateSuccess(200, "All Users", users)); 
    }catch(error){
        return next(CreateError(500, "Internal Server Error!"))
    }
}

const getById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return next(CreateError(404, 'User not found!'));
        }
        else{
            return next(CreateSuccess(200, "Single User", user))
        }
    } catch (error) {
        return next(CreateError(500, "Internal Server Error!"))
    }
}

module.exports = {
    getAllUser : getAllUser,
    getById : getById
}