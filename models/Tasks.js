const mongoose = require('mongoose')

const tasksSchema = mongoose.Schema(
    {
        subject: {
            type: String,
            required: true
        },

        description: {
            type: String,
            require: true
        },
        status:{
            type:String,
            default:"Pending"

        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true

        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('tasks', tasksSchema)