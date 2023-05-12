const Tasks = require("../models/Tasks");
const { success, error } = require("../utils/responseWrapper");

const addTask = async (req, res) => {
    try {
        const { task, description } = req.body;
        const owner = req._id;

        if(!task || !description){
            return res.send(error(403,"All fields required"))
        }

        const newTask = await Tasks.create({
            owner, task, description
        })

        return res.send(success(200, { newTask }))



    } catch (e) {
        return res.send(error(500, e.message))
    }

}

module.exports = {
    addTask
}