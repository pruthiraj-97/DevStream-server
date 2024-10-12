const CompilterService=require('../service/compilation')
async function compilalation(req,res){
    try {
        const {language,code}=req.body
        const id=req.params.id
        const payload=req.user
        if(!language || !code){
            return res.status(400).json({
                status:400,
                error:{
                    message:'All fields are required'
                },
                data:null
            })
        }
        const response=await CompilterService.compile(language,code,payload,id)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json({
            status:500,
            error:{
                message:'something went wrong'+error,
            },
            data:null
        })
    }
}

module.exports={
    compilalation
}