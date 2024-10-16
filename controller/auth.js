const JWT=require('jsonwebtoken')
const UserService=require('../service/user')
async function register(req,res){
    try {
        console.log(req.body)
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

async function isAutherize(req,res){
    try {
        const token=req.headers['x-access-token']
        const payload=JWT.verify(token,process.env.JWT_SECRET)
        if(!payload){
            return res.status(401).json({
                data:null,
                error:{
                    message:"user is not authenticated"
                }
            })
        }
        return res.status(200).json({
            status:200,
            message:'user is authenticated',
            success:true,
            payload
        })
    } catch (error) {
        return res.status(401).json({
            message:"user is authenticated",
            success:false
        })
    }
}

module.exports={
    register,
    login,
    isAutherize
}