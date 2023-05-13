const router = require('express').Router();
const requireUser = require('../middlewares/RequireUser');
const authRouter = require('./authRouter')
const taskRouter = require('./taskRouter')
const userRouter = require('./userRouter')

router.use('/auth', authRouter)
router.use('/task',requireUser, taskRouter)
router.use('/user',requireUser, userRouter)

module.exports = router