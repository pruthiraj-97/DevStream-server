const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const { addUserSocketId ,addToRoom}=require('../utils/redis')
const { sendCompilationEvent }=require('../utils/notification');
const dashboard = require('../model/dashboard');
const app = express();
const server = createServer(app);
let io;
app.use(express.json())
function startSocketConnection(){
   try {
    io = new Server(server,{
      cors:{
            origin:"*",
            credentials:true
      }
    });
    io.on('connection',(socket) => {
       socket.on('join_room',async (DashboardId,userId)=>{
           if(DashboardId){
               await socket.join(DashboardId)
               console.log(userId ,'joined room')
               socket.emit('room_joined','room_joined')
           }else{
            console.log('roomId not found')
           }
       })

       socket.on('leave_room',(dashboardId)=>{
         socket.leave(dashboardId)
         console.log(dashboardId,'left room')
       })
       
       socket.on('compile_code',(dashboardId)=>{
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

