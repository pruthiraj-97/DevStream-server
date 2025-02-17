const bodyParser = require('body-parser');
const { server,app,startSocketConnection }=require('./config/socket')
const {redis_client}=require('./config/redis')
const { connectDB }=require('./config/Database')
const version1=require('./version/version1')
const cors=require('cors')
require('dotenv').config()
const PORT=process.env.PORT
app.use(cors({
    origin:"*",
    credentials:true
}))


app.get('/',(req,res)=>{
    res.status(200).json({
        message:"well come to DevStream server"
    })
})

app.use('/api/v1',version1)
function startServer(){
    try {
        startSocketConnection()
        server.listen(PORT,()=>{
            console.log('server is running on port',PORT)
        })
        redis_client.connect()
        connectDB()
    } catch (error) {
        console.log('error in server connection')
        process.exit(1)
    }
}

startServer()