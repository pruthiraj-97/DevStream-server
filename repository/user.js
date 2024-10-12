const UserModel=require('../model/user')
class UserRepository{
    constructor(){
        console.log('User repository is connected')
    }
    async createUser(data){
        const result=await UserModel.create(data)
        return result
    }

    async getByEmail(email){
        const result=await UserModel.findOne({email:email})
        return result
    }

    async getById(id){
        const result=await UserModel.findById(id)
        return result
    }
}

module.exports=new UserRepository()