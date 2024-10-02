const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  question:String,
  answer: String,
},{
  Timestamp:true
})

module.exports =mongoose.models.chats || mongoose.model('Chat', chatSchema);