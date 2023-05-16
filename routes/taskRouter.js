const taskController = require('../controllers/tasksController');

const router = require('express').Router();

router.post('/create', taskController.addTask)
router.post('/getTask', taskController.getTask)
router.post('/update', taskController.updateTask)
router.post('/delete', taskController.deleteTask)

module.exports = router