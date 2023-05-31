const router = require('express').Router();
const requireUser = require('../middlewares/reqUser').userNeeded;
const authRouter = require('./authRouter')
const taskRouter = require('./taskRouter')
const userRouter = require('./userRouter')

router.use('/auth', authRouter)
router.use('/note', requireUser, taskRouter)
router.use('/user', requireUser, userRouter)

module.exports = router