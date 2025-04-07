const { testUserController } = require("../controller/testController")

const express=require('express')

//router object
const router=express.Router()

//routes
router.get('/test-user',testUserController)
//export
module.exports=router

