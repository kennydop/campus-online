import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema({
  
  authorId:{
    type: String,
    required: true,
  },
  comment:{
    type: String,
    required: true,
  }
},
{ timestamps: true }
)

const PollSchema = new mongoose.Schema({
  pick:{
    type: String,
    required: true,
  },
  votes:{
    type: Number,
    required: true,
  }
})

const PostSchema = new mongoose.Schema(
  {
    authorId: {
      type: String,
      required: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      max: 500,
    },
    media: {
      type: String,
    },
    type: {
      type: String,
    },
    poll: {
      type: [PollSchema]
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
