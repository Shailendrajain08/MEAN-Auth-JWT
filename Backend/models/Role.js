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

export default mongoose.model("Role", RoleSchema)