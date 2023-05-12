const router = require('express').Router();
const requireUser = require('../middlewares/RequireUser');
const authRouter = require('./authRouter')
const taskRouter = require('./taskRouter')

router.use('/auth', authRouter)
router.use('/task',requireUser, taskRouter)

module.exports = router