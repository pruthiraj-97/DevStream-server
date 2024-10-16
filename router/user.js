const express=require('express')
const router=express.Router()
const {login,register,isAutherize}=require('../controller/auth')
router.post('/register',register)
router.post('/login',login)
router.get('/isautherize',isAutherize)
module.exports=router