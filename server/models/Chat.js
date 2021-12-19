import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  from: {
    type: String,
  },
  read: {
    type: Boolean,
    default: false,
  }
},
{ timestamps: true }
)

const ChatSchema = new mongoose.Schema({
  members: {
    type: Array,
  },
  messages: {
    type: [MessageSchema]
  }
})

export default mongoose.model("Chat", ChatSchema);
