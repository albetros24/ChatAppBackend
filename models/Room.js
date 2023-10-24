const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
   
    name: String,
    roomId:String,
    userId:String
  
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;