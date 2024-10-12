const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const { addUserSocketId ,addToRoom}=require('../utils/redis')
const { sendCompilationEvent }=require('../utils/notification')
const app = express();
const server = createServer(app);
let io;
app.use(express.json())
function startSocketConnection(){
   try {
    io = new Server(server);
    io.on('connection', (socket) => {
       console.log('a user connected');
       const userId=socket.handshake.query.userId
       console.log(userId+" "+socket.id)
       //addUserSocketId(userId,socket.id)
       socket.on('join_room',async (DashboardId)=>{
           if(DashboardId){
               let ans=socket.join(DashboardId)
               console.log(ans)
               console.log(`user with id ${userId} joined room ${DashboardId}`)
           }else{
            console.log('roomId not found')
           }
       })
       
       socket.on('compile_code',(dashboardId)=>{
          console.log("data is ",dashboardId)
          if(dashboardId && userId){
             sendCompilationEvent(dashboardId,1224)
          }
       })
       
    });
   } catch (error) {
     console.log('error in socket connection',error)
     process.exit(1)
   }
}

function getSocket(){
    if(io) return io
    return null
}

module.exports={
  app,
  server,
  io,
  getSocket,
  express,
  startSocketConnection
}

