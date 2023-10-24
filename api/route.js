const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

router.get('/rooms',async(req,res)=>{
    const rooms=  await Room.find();
    if(!rooms){
       return res.status(404).json({message:'No rooms found'})
    }
    res.json({rooms});
})

router.delete('/rooms/:roomId',async( req,res)=>{
   await Room.deleteOne({roomId:req.params.roomId});
     res.json({message:'Room deleted'})
})








module.exports = router;