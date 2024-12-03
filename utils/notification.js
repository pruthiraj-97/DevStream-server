const { getAllUserInRoom }=require('./redis')
const UserRepository=require('../repository/user')

async function sendNewUserNotification(DashboardId,payload){
   const { getSocket }=require('../config/socket')
   const io=getSocket()
   if(!io) return null
   const socketIds = await io.in(DashboardId).allSockets();
   io.to(DashboardId).emit("newuser"+DashboardId,payload)
}

async function sendUpdateCodeNotification(DashboardId,payload){
   const { getSocket }=require('../config/socket')
   const io=getSocket()
   if(!io) return null
   const socketIds = await io.in(DashboardId).allSockets();
   io.to(DashboardId).emit("newcode"+DashboardId,payload)
}

async function sendCompilationResult(dashboardId,payload){
   const { getSocket }=require('../config/socket')
   const io=getSocket()
   if(!io) return null
   const socketIds = await io.in(dashboardId).allSockets();
   io.to(dashboardId).emit('compilationResult'+dashboardId,payload)
}

async function sendCompilationEvent(dashboardId,userDetails){
   const { getSocket }=require('../config/socket')
   const io=getSocket()
   if(!io) return null
   const socketIds = await io.in(dashboardId).allSockets();
   const payload={
      dashboardId,
      userDetails,
      message:`${userDetails.name} is compiling the code`
   }
   io.to(dashboardId).emit('compilation_start'+dashboardId,payload)
}

async function sendRemoveCollborator(dashboardId,payload,result){
   const { getSocket }=require('../config/socket')
   const io=getSocket()
   if(!io) return null
   const socketIds = await io.in(dashboardId).allSockets();
   const sendMessage={
      dashboardId,
      name:payload.name,
      id:payload.id,
      message:`${payload.name} leave the room`,
      result
   }
   io.to(dashboardId).emit('leaveMessage'+dashboardId,sendMessage)
}

async function BoardCastLanguageChange(dashboardId,language,payload){
   const { getSocket }=require('../config/socket')
   const io=getSocket()
   if(!io) return null
   const socketIds = await io.in(dashboardId).allSockets();
   const Message={
      language:language,
      user:payload.name,
      id:payload.id,
      info:`${payload.name} change the language`
   }
   console.log(Message)
   io.to(dashboardId).emit('language_change'+dashboardId,Message)
}

module.exports={
    sendNewUserNotification,
    sendUpdateCodeNotification,
    sendCompilationResult,
    sendCompilationEvent,
    sendRemoveCollborator,
    BoardCastLanguageChange
}