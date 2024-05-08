const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema(
    {
        role:{
            type: String,
            require : true
        }
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model("Role", RoleSchema)