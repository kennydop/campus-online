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

const ChoiceSchema = new mongoose.Schema({
  choice:{
    type: String,
    required: true,
  },
  votes:{
    type: [String],
    default: []
  }
})

const PollSchema = new mongoose.Schema({
  choices:{
    type: [ChoiceSchema],
    required: true,
  },
  expireAt: {
    type: Date,
  },
  votes: {
    type: [String],
    default: []
  }
})

const ProductSchema = new mongoose.Schema({
  productName:{
    type: String,
    required: true,
  },
  productPrice:{
    type: String,
    required: true,
  },
  productCondition:{
    type: String,
    required: true,
  },
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
      type: PollSchema
    },
    product: {
      type: ProductSchema
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
