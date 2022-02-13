import mongoose from "mongoose"

var current = new Date();
var exp = new Date(current.getTime() + 86400000);
exp.toLocaleDateString();

const StoryMediaSchema = new mongoose.Schema({
  description: {
    type: String,
    max: 500,
  },
  img: {
    type: String,
  },
  expireAt: {
    type: Date,
    default: exp,
    expires: "24h"
  },
  storyType: {
    type: String,
  },
})

const StorySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    media:{
      type: [StoryMediaSchema]
    }
  },
);

export default mongoose.model("Story", StorySchema);
