const mongoose=require('mongoose')
const connectDB= async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/codeingroom')
        console.log('database connected')
    } catch (error) {
        console.log('error in database connection')
    }
}

module.exports={
    connectDB
}