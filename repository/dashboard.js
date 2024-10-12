const DashboardModel=require('../model/dashboard')
class DashBoardRepository{
    constructor(){
       console.log('Dashboard repository is connected')
    }
    async create(name,owner){
        const result=await DashboardModel.create({
            name,
            owner
        })
        return result
    }

    async getBtId(id){
        const result=await DashboardModel.findOne({_id:id})
        .populate({
            path:'owner',
            select:'name _id'
        })
        .populate({
            path:'collaborators',
            select:'name _id'
        })
        return result
    } 
    async addCollaborator(dashboardId,collaboratorId){
        console.log(dashboardId,collaboratorId)
        const result=await DashboardModel.findOneAndUpdate({_id:dashboardId},{
            $addToSet:{
                collaborators:collaboratorId
            }
        },
        {new:true})
        .populate({
             path:'owner',
             select:'name _id'
         })
         .populate({
             path:'collaborators',
             select:'name _id'
         })
        console.log(result)
        return result
    }


    async updateCode(dashboardId,code){
      const updatedCode=await DashboardModel.findOneAndUpdate({_id:dashboardId},{
        $set:{
            code
        }
      },{new:true})
      console.log(updatedCode)
      return updatedCode
    }
}

module.exports=new DashBoardRepository()