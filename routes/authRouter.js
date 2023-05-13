const router = require('express').Router()
const authController = require('../controllers/authController')

router.post('/login', authController.loginController)
router.post('/signup', authController.signupController)
router.post('/logout', authController.logOutController)
router.post('/refresh', authController.refreshAccessToken)

module.exports = router