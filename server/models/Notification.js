import mongoose from "mongoose"

const NotificationMessageSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  from: {
    type: String,
  },
  type: {
    type: String,
  },
  post: {
    type: String,
  },
  read: {
    type: Boolean,
    default: false,
  }
},
{ timestamps: true }
)

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    notifications:{
      type: [NotificationMessageSchema]
    }
  },
)

export default mongoose.model("Notification", NotificationSchema);