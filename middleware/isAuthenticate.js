const JWT=require('jsonwebtoken')
const { DeleteTokenLimit }=require('../utils/redis')
async function isAuthenticate(req,res,next){
    const token=req.headers['x-access-token']
    try {
        const payload=JWT.verify(token,process.env.JWT_SECRET)
        if(!payload){
            return res.status(401).json({
                data:null,
                status:401,
                error:{
                    message:"user is not authenticated"
                }
            })
        }
        req.user=payload
        next()
    } catch (error) {
        //await DeleteTokenLimit(token)
        return res.status(401).json({
            data:null,
            status:401,
            error:{
                message:"user is not authenticated" +error
            }
        })
    }
}
module.exports={
    isAuthenticate
}