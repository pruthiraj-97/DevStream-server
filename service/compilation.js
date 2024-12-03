const { compileCode } = require('../config/compiler')
const {sendCompilationResult}=require('../utils/notification')
class CompilterService{
    constructor(){
        console.log('compilation service is connected')
    }
    async compile(language,code,userDetails,dashboardId){
        const response=await compileCode(language,code)
        const payload={
            code:code,
            language:language,
            userDetails:userDetails,
            compilationResult:response.data,
            error:response.error
        }
        sendCompilationResult(dashboardId,payload)
        if(!response.data){
            return {
                status:200,
                data:null,
                error:{
                    message:response.error
                }
            }
        }else{
            return {
                status:200,
                data:response.data,
                error:null
            }
        }
    }
}

module.exports=new CompilterService()