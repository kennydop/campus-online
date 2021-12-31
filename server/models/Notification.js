import mongoose from "mongoose"

const NotificationMessageSchema = new mongoose.Schema({
  title: {
    type: String,
  },
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

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    notification:{
      type: [NotificationMessageSchema]
    }
  },
)

export default mongoose.model("Notification", NotificationSchema);