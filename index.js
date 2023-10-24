
const express= require('express');
const  http= require('http');
 const {Server}= require('socket.io');
 const app= express();
const sockets=require('./sockets/controllers')

 const PORT =8000;
 const httpServer= http.createServer(app);
  const cors = require('cors');
require('dotenv').config();
require('./db');
app.use(cors());
const router = require('./api/route');
  const io= new Server(httpServer,{
    cors:{
        origin:'http://localhost:3000'
    },
  
  });

 app.use('/',router)
 app.get('/api',(req,res)=>{
    res.send('Hello world your server is here')
 })
//connecting to socketsroutes
io.on('connection',sockets)

 httpServer.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
 })