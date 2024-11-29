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

async function SetUserTokenForRateLimiting(token,data,count){
   const payload={
     time:data,
     count:count
   }
   const result=await redis_client.set(token,JSON.stringify(payload));
   return result
}

async function GetUserTokenLimit(token){
    const result=await redis_client.get(token)
    return JSON.parse(result)
}

async function DeleteTokenLimit(token){
    await redis_client.del(token)
}


module.exports={
    addToRoom,
    addUserSocketId,
    getAllUserInRoom,
    SetUserTokenForRateLimiting,
    GetUserTokenLimit,
    DeleteTokenLimit
}