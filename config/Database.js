const mongoose=require('mongoose')
const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('database connected')
    } catch (error) {
        console.log('error in database connection ',error)
        process.exit(1)
    }
}

module.exports={
    connectDB
}