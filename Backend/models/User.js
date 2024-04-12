const mongoose = require('mongoose');
const Schema = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        firstName:{
            type : String,
            require : true
        },
        lastName : {
            type: String,
            require : true
        },
        email : {
            type : String,
            require : true,
            unique : true
        },
        password : {
            type : String,
            require : true
        },
        profileImage : {
            type : String,
            require : false,
            default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tenforums.com%2Ftutorials%2F90186-change-default-account-picture-windows-10-a.html&psig=AOvVaw3lYudSauevBTG2BxsTn-7i&ust=1712956767444000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMDcl6-Lu4UDFQAAAAAdAAAAABAE"
        },
        isAdmin : {
            type : Boolean,
            default : false
        }, 
        roles : {
            type : [Schema.Types.ObjectId],
            require : true,
            ref : "Role"
        }
    },
    {
        timestamps : true
    }
)

module.export = mongoose.model("User", UserSchema)