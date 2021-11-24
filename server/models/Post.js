import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true,
  },
  comment:{
    type: String,
    required: true,
  }
})

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    postType: {
      type: String,
    },
    college: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: [CommentSchema],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
