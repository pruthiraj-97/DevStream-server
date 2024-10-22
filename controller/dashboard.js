const DashBoardService=require('../service/dashboard')
async function getDashBoard(req,res){
    try {
        const id=req.params.id
        const response=await DashBoardService.getDashboard(id)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json({
            status:500,
            data:null,
            error:{
                message:"something went wrong" +error
            }
        })
    }
}

async function createDashboard(req,res){
    try {
        const id=req.user.id
        const response=await DashBoardService.createDashboard(id)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json({
            status:500,
            data:null,
            error:{
                message:"something went wrong"+error
            }
        })
    }
}

async function addCollaborators(req,res){
    try {
    console.log("controller code is running")
    const id=req.params.id
    const payload=req.user
    const response=await DashBoardService.addCollaborator(id,payload)
    return res.status(response.status).json(response)
    } catch (error) {
     return res.status(500).json({
         status:500,
         data:null,
         error:{
             message:"something went wrong" +error
         }
     })
    }
}


async function updateCode(req,res){
    try {
        const id=req.params.id
        const code=req.body.code || ''
        const {language}=req.body
        if(!language){
            return res.status(400).json({
                status:400,
                error:{
                    message:'All fields are required'
                },
                data:null
            })
        }
        const payload=req.user
        const response=await DashBoardService.updateCode(id,code,payload,language)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json({
            status:500,
            data:null,
            error:{
                message:"something went wrong "+error
            }
        })
    }
}

async function getAllUsers(req,res){
    try {
        const {id}=req.params
        const response=await DashBoardService.getAllCollaborators(id)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json({
            status:500,
            data:null,
            error:{
                message:"something went wrong "+error
            }
        })
    }
}

async function LeaveRoom(req,res){
    try {
        const {id}=req.params
        const payload=req.user
        const response=await DashBoardService.removeCollaborator(id,payload)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json({
            data:null,
            error:{
                message:"somethink went wrong"
            }
        })
    }
}

async function LanguageChange(req,res){
    try {
        const {language}=req.body
        const id=req.params.id
        if(!language){
            return res.status(400).json({
                status:400,
                data:null,
                error:{
                    message:"Select language"
                }
            })
        }
        const payload=req.user
        const response=await DashBoardService.changeCurrentLanguage(id,language,payload)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json({
            status:400,
            data:null,
            error:{
                message:'some think went wronge'
            }
        })
    }
}

module.exports={
    getDashBoard,
    createDashboard,
    addCollaborators,
    updateCode,
    getAllUsers,
    LeaveRoom,
    LanguageChange
}