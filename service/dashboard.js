const { sendNewUserNotification, sendUpdateCodeNotification ,sendRemoveCollborator,BoardCastLanguageChange }=require('../utils/notification')
const DashBoardRepository=require('../repository/dashboard')
class DashBoardService{
    constructor(){
        console.log('Dashboard service is connected')
    }
    async createDashboard(id){
       const result=await DashBoardRepository.create(id)
       return {
        status:200,
        error:null,
        data:{
            message:"dashboard created successfully",
            dashboard:result
        }
       }
    }
    async getDashboard(id){
        const result=await DashBoardRepository.getBtId(id)
        return {
            status:200,
            error:null,
            data:{
                message:"get dashboard details",
                dashboard:result
            }
           }
    }
    async addCollaborator(dashboardId,payload){
        const result=await DashBoardRepository.addCollaborator(dashboardId,payload.id)
        let message={
            name:payload.name,
            id:payload.id,
            email:payload.email
        }
        sendNewUserNotification(dashboardId,message)
        return {
            status:200,
            error:null,
            data:{
                message:"collaborator added successfully",
                dashboard:result
            }
        }
        
    }
    async updateCode(dashboardId,code,payload,language){
        const result=await DashBoardRepository.updateCode(dashboardId,code)
        let message={
            code,
            name:payload.name,
            id:payload.id,
            email:payload.email,
            language
        }
        sendUpdateCodeNotification(dashboardId,message)
        return {
            status:200,
            error:null,
            data:{
                message:"code updated successfully",
                dashboard:result
            }
        }
    }

    async getAllCollaborators(dashboardId){
        const result=await DashBoardRepository.getCollaborators(dashboardId)
        return {
            status:200,
            error:null,
            data:{
                message:"get dashboard details",
                collaborators:result.collaborators
            }
        }
    }

    async removeCollaborator(dashboardId,payload){
        const result=await DashBoardRepository.removeCollaborator(dashboardId,payload.id)
        await sendRemoveCollborator(dashboardId,payload,result)
        return {
            status:200,
            data:{
                newCollborators:result
            },
            error:null
        }
    }

    async changeCurrentLanguage(dashboardId,language,payload){
        await BoardCastLanguageChange(dashboardId,language,payload)
        return {
            status:200,
            data:{
                message:'Language boardcast succesfully'
            },
            error:null
        }
    }
}

module.exports=new DashBoardService()