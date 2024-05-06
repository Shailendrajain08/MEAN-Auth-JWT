const express = require('express');
const { getAllUser, getById } = require('../controllers/user.controller');
const { verifyAdmin, verifyUser } = require('../utils/verifyToken');
const router = express.Router();

// get all 
router.get('/', verifyAdmin, getAllUser);

// get by id 
router.get('/:id', verifyUser, getById);

module.exports = router;