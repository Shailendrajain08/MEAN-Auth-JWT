const express = require('express');
const { createRole, updateRole, getAllRole, deleteRole } = require('../controllers/role.controller');
const router = express.Router();

// create a new role 
router.post('/create', createRole)

//update a role 
router.put('/update/:id', updateRole)

// get all roles 
router.get('/getRole', getAllRole)

router.delete('/deleteRole/:id', deleteRole)

module.exports = router;