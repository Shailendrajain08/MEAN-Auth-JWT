const express = require('express');
const Role = require('../models/Role')

const router = express.Router();

// create a new role 
router.post('/', async (req, res, next) => {
    try {
        if(req.body.role && req.body.role !== ""){
            const newRole = new Role(req.body);
            await newRole.save();
            return res.send("Role Created!")
        }else{
            return res.status(400).send("Bad Request")
        }
    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }
})