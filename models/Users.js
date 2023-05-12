const mongoose = require('mongoose');


const userSchema = mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            lowercase:true
            
        },
        name:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true,
            select:false
            
        },
        avatar:{
            publicId:String,
            url:String

        }
    },

    {
        timestamps:true

    }
)


module.exports = mongoose.model('users',userSchema);
