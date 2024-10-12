const { getAllUserInRoom }=require('./redis')
const UserRepository=require('../repository/user')
async function sendNewUserNotification(DashboardId,payload){
   const { getSocket }=require('../config/socket')
   const io=getSocket()
   console.log("io is",io)
   if(!io) return null
   const socketIds = await io.in(DashboardId).allSockets();
   console.log("all socket are ",socketIds)
   io.to(DashboardId).emit("newuser"+DashboardId,payload)
}

function sendUpdateCodeNotification(DashboardId,payload){
   const { getSocket }=require('../config/socket')
   const io=getSocket()
   console.log("io is",io)
   if(!io) return null
   console.log("payload is  ",payload)
   io.to(DashboardId).emit("newcode"+DashboardId,payload)
}

function sendCompilationResult(dashboardId,payload){
   const { getSocket }=require('../config/socket')
   const io=getSocket()
   console.log("io is",io)
   if(!io) return null
   console.log(payload)
   io.to(dashboardId).emit('compilationResult'+dashboardId,payload)
}

async function sendCompilationEvent(dashboardId,userId){
   const { getSocket }=require('../config/socket')
   const io=getSocket()
   if(!io) return null
   // const userDetails=await UserRepository.getById(userId)
   // console.log("user details is ",userDetails)
   const payload={
      dashboardId,
      userId,
      // message:`${userDetails.name} is compiling the code`
   }
   console.log("payload is ",payload)
   io.to(dashboardId).emit('compilation_start'+dashboardId,payload)
}

module.exports={
    sendNewUserNotification,
    sendUpdateCodeNotification,
    sendCompilationResult,
    sendCompilationEvent
}