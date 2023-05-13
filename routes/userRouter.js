const router = require('express').Router()
const userController = require('../controllers/userController')


router.get('/myprofile',userController.getMyProfile)
router.put('/updateprofile',userController.updateProfile)
router.delete('/deleteprofile',userController.deletMyProfile)


module.exports=router