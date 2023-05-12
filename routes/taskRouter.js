const taskController = require('../controllers/tasksController');

const router = require('express').Router();

router.post('/create',taskController.addTask)

module.exports = router