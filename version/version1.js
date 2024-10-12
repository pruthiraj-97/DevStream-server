const express=require('express')
const router=express.Router()
const userRouter=require('../router/user')
const dashboardRouter=require('../router/dashboard')
router.use('/auth',userRouter)
router.use('/dashboard',dashboardRouter)
module.exports=router