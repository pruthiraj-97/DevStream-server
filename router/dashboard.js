const express=require('express')
const router=express.Router()
const {
    getDashBoard,
    createDashboard,
    addCollaborators,
    updateCode,
    getAllUsers,
    LeaveRoom,
    LanguageChange
}=require('../controller/dashboard')
const { compilalation }=require('../controller/compilation')
const { isAuthenticate }=require('../middleware/isAuthenticate')
router.get('/:id',isAuthenticate,getDashBoard)
router.post('/createdashboard',isAuthenticate,createDashboard)
router.post('/join/:id',isAuthenticate,addCollaborators)
router.put('/updatecode/:id',isAuthenticate,updateCode)
router.post('/compile/:id',isAuthenticate,compilalation)
router.get('/collaborators/:id',isAuthenticate,getAllUsers)
router.put('/leave/:id',isAuthenticate,LeaveRoom)
router.put('/updatelanguage/:id',isAuthenticate,LanguageChange)

module.exports=router