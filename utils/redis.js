const {redis_client}=require('../config/redis')
async function addToRoom(DashboardId,userId){
    console.log(DashboardId,userId)
    const result=await redis_client.sAdd(DashboardId,userId)
    console.log(result)
    return result
}

async function removeFromRoom(DashboardId,userId){
    const result=await redis_client.sRem(DashboardId,userId)
    return result
}

async function addUserSocketId(userId,socketId){
    const result=await redis_client.set(userId,socketId)
    console.log(result)
    return result
}

async function getAllUserInRoom(DashboardId){
    const result=await redis_client.sMembers(DashboardId)
    return result
}

module.exports={
    addToRoom,
    addUserSocketId,
    getAllUserInRoom
}