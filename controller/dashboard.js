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
        const {name}=req.body
        if(!name){
            return res.status(400).json({
                status:400,
                data:null,
                error:{
                    message:"name is required"
                }
            })
        }
        const id=req.user.id
        const response=await DashBoardService.createDashboard(name,id)
        console.log(response)
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
        const {code}=req.body
        if(!code){
            return res.status(400).json({
                status:400,
                data:null,
                error:{
                    message:"code is required"
                }
            })
        }
        const payload=req.user
        console.log(id,code,payload)
        const response=await DashBoardService.updateCode(id,code,payload)
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

module.exports={
    getDashBoard,
    createDashboard,
    addCollaborators,
    updateCode
}