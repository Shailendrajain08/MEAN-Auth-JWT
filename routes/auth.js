const express = require('express');
const { createUser, loginUser, createAdmin } = require('../controllers/auth.controller');
const router = express.Router();

// register 
router.post("/register", createUser)

// login
router.post("/login", loginUser)

// register-admin
router.post("/createAdmin", createAdmin)

module.exports = router;