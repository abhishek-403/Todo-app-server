const mongoose = require('mongoose');


const userSchema = mongoose.Schema(
    {   
        username:{
            type: String,
            lowercase: true,
            required: true

        },
        email: {
            type: String,
            required: true,
            lowercase: true

        },
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            select: false

        },
        tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "tasks"

        }],
        avatar: {
            publicId: String,
            url: String

        }
    },

    {
        timestamps: true

    }
)


module.exports = mongoose.model('users', userSchema);
