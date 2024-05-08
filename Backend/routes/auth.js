const express = require('express');
const { createUser, loginUser, createAdmin, sendEmail, resetPassword } = require('../controllers/auth.controller');
const router = express.Router();

// register 
router.post("/register", createUser)

// login
router.post("/login", loginUser)

// register-admin
router.post("/createAdmin", createAdmin)

// send reset password email 

router.post("/forgetPassword", sendEmail)

// reset password

router.post("/resetPassword", resetPassword)

module.exports = router;