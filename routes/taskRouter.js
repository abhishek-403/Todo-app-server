const taskController = require('../controllers/tasksController');

const router = require('express').Router();

router.post('/create', taskController.addTask)
router.put('/update', taskController.updateTask)
router.delete('/delete', taskController.deleteTask)

module.exports = router