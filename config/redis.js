const { createClient } =require('redis');

// const redis_client = createClient({
//     password: 'LaLWrymDFp4bBIisGLrZcjxpWPhNosuk',
//     socket: {
//         host: 'redis-16544.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
//         port: 16544
//     }
// });

const redis_client=createClient({ // running in docker
    host:"redis",
    port:6379
})

redis_client.on('connect',()=>{
    console.log('connected to redis')
})

redis_client.on('error',(error)=>{
    console.log('error in redis connection',error)
    process.exit(1)
})

module.exports={
    redis_client
}