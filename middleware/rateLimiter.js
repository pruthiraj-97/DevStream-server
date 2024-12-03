const { GetUserTokenLimit ,SetUserTokenForRateLimiting}=require('../utils/redis')

const setRateLimiterForCompilation=async(req,res,next)=>{
    let token=req.headers['x-access-token']
    let isLimitExceed=false
    const result=await GetUserTokenLimit(token)
    console.log(result)
    const currentDate = new Date();
    const currentTime=(currentDate.toString()).substring(0,21);
    if(result){
        let lastRequestTime=result.time
        let lastCount=result.count
        if(lastRequestTime==currentTime){
            if(lastCount>=5){
                isLimitExceed=true
            }else{
                await SetUserTokenForRateLimiting(token,currentTime,lastCount+1);
            }
        }else{
             await SetUserTokenForRateLimiting(token,currentTime,0);
        }
    }
    
    console.log("is excited",isLimitExceed)
    if(!isLimitExceed){
        next()
    }else{
        return res.status(429).json({
            status:429,
            success:false,
            data:null,
            error:{
                message:"Too many request please wait for some time"
            }
        })
    }
}

module.exports={
    setRateLimiterForCompilation
}