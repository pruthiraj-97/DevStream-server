const userRepository=require('../repository/user')
const bcrypt=require('bcryptjs')
const JWT=require('jsonwebtoken')
class UserService{
    constructor(){
    console.log('User service is connected')
    }
    async createUser(payload){
        const isUserExist=await userRepository.getByEmail(payload.email)
        if(isUserExist){
            return {
                status:400,
                data:{
                    message:"user already exist"
                },
                error:null
            }
        }
       let hashPassword=await bcrypt.hash(payload.password,10)
       payload.password=hashPassword
       let newUser=await userRepository.createUser(payload)
       delete newUser.password
        return {
            status:200,
            data:{
                message:"user created successfully",
                newUser
            },
            error:null
        }
    }
    async LoginUser(payload){
        let isUserExist=await userRepository.getByEmail(payload.email)
        if(!isUserExist){
            return {
                status:400,
                data:{
                    message:"Email doesn't exist"
                },
                error:null
            }
        }
        const isMatch=await bcrypt.compare(payload.password,isUserExist.password)
        if(!isMatch){
            return {
                status:400,
                data:{
                    message:"password doesn't match"
                },
                error:null
            }
        }
        const userPayload={
            id:isUserExist._id,
            email:isUserExist.email,
            name:isUserExist.name
        }
        delete isUserExist.password
        const token=JWT.sign(userPayload,process.env.JWT_SECRET,{expiresIn:'1d'})
        return {
            status:200,
            data:{
                message:"login successfully",
                token,
                user:isUserExist
            }
        }
    }
    async LogoutUser(){

    }
}

module.exports=new UserService()