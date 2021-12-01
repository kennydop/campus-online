import mongoose from "mongoose"

const CollegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
  },
  users: {
    type: Array,
  }
})

export default mongoose.model("College", CollegeSchema);
