import mongoose from "mongoose"

var current = new Date();
var exp = new Date(current.getTime() + 86400000);
exp.toLocaleDateString();

const StorySchema = new mongoose.Schema(
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
    storyType: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    expireAt: {
      type: Date,
      default: exp,
      expires: "24h"
    },
  },
);

export default mongoose.model("Story", StorySchema);
