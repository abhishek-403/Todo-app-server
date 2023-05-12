const mongoose = require('mongoose')

const tasksSchema = mongoose.Schema(
    {
        task: {
            type: String,
            required: true
        },

        description: {
            type: String,
            require: true
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