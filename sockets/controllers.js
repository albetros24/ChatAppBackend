const sockets=(socket)=>{
 const Room=require('../models/Room')

    socket.on('sent-message',({message ,roomId})=>{
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        console.log(roomId)
        skt.emit("message-from-server", { message });
    });
    socket.on('disconnect',(socket)=>{
        console.log('user disconnected')
    });
    socket.on('typing-started',({roomId})=>{
        let skt =socket.broadcast
        skt= roomId ? skt.to(roomId) : skt;
       skt.emit('typing-started-from-server');
        console.log('typing....', roomId);
    })
    socket.on('typing-stopped',({roomId})=>{
        let skt =socket.broadcast
        skt= roomId ? skt.to(roomId) : skt;
        skt.emit('typing-stopped-from-server');
        console.log('typing stopped',roomId);
    })
    socket.on('join-room',({roomId})=>{
        socket.join(roomId);
        
        console.log('Joining room',roomId);
    })
    socket.on('new-room-created',({roomId,userId})=>{
    
      
        const room=  new Room({
            name:"Test",
            roomId:roomId,
            userId:userId
        });
        room.save()
        socket.emit('new-room-created',{room});
    })

socket.on('room-removed',({roomId})=>{
    socket.emit('room-removed',{roomId});
})
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
}

module.exports=sockets;