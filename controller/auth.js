const UserService=require('../service/user')
async function register(req,res){
    try {
        console.log(req.params)
        const {name,email,password}=req.body
        if(!name || !email || !password){
            return res.status(400).json({
                status:400,
                message:'All fields are required'
            })
        }
        const response=await UserService.createUser({name,email,password})
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json({
            data:null,
            error:{
                message:"some think went wrong" + error,
                status:500
            }
        })
    }
}

async function login(req,res){
    try {
        const {email,password}=req.body
        const response=await UserService.LoginUser({email,password})
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json({
            data:null,
            error:{
                message:"some think went wrong" + error,
                status:500
            }
        })
    }
}

module.exports={
    register,
    login
}