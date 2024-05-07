const express = require('express');
const { createUser, loginUser, createAdmin, sendEmail } = require('../controllers/auth.controller');
const router = express.Router();

// register 
router.post("/register", createUser)

// login
router.post("/login", loginUser)

// register-admin
router.post("/createAdmin", createAdmin)

// send reset password email 

router.post("/send-email", sendEmail)

module.exports = router;