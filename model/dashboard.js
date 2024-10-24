const mongoose=require('mongoose')

const dashboardModel=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    collaborators:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    code:{
        type:String,
        default:''
    }
}) 

module.exports=mongoose.model('DashboardModel',dashboardModel)