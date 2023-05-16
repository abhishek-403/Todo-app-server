const Tasks = require("../models/Tasks");
const Users = require("../models/Users");
const { success, error } = require("../utils/responseWrapper");

const addTask = async (req, res) => {
    try {
        const { subject, description } = req.body;
        const owner = req._id;

        if (!subject || !description) {
            return res.send(error(403, "All fields required"))
        }

        const newTask = await Tasks.create({
            owner, subject, description
        })

        const curUser = await Users.findById(owner);
        curUser.tasks.push(newTask._id)
        await curUser.save();


        return res.send(success(200, { newTask, curUser }))



    } catch (e) {
        return res.send(error(500, e.message))
    }

}

const updateTask = async (req, res) => {
    try {
        const { subject, description, taskId, status } = req.body;
        const oldTask = await Tasks.findById(taskId);

        if (subject) {
            oldTask.subject = subject;

        }

        if (description) {
            oldTask.description = description;

        }

        if (status) {
            oldTask.status = status;

        }
        await oldTask.save();


        return res.send(success(200, { updatedTask: oldTask }))



    } catch (e) {
        return res.send(error(500, e.message))
    }

}


const getTask = async (req,res)=>{
    try {
        const {noteId}= req.body;
        const note= await Tasks.findById(noteId);
        return res.send(success(200,{note}))
        
    } catch (e) {
        return res.send(error(500,e.message))
        
    }
}

const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.body;
        const curUserId = req._id
        const curUser = await Users.findById(curUserId);
        const task = await Tasks.findById(taskId)

        if (!curUser.tasks.includes(taskId)) {
            return res.send(error(403, "Not in your tasks"))
        }

        const index = curUser.tasks.indexOf(taskId);
        curUser.tasks.splice(index, 1);
        await task.deleteOne()


        await curUser.save()

        return res.send(success(200, { curUser }))



    } catch (e) {
        return res.send(error(500, e.message))

    }


}










module.exports = {
    addTask,
    deleteTask,
    updateTask,
    getTask
}