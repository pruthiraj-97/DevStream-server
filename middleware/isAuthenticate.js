const JWT=require('jsonwebtoken')
function isAuthenticate(req,res,next){
    try {
        const token=req.headers['x-access-token']
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