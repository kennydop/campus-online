import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Session = new mongoose.Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      // required: true,
      max: 50,
      unique: true,
    },
    // password: {
    //   type: String,
    //   // required: true,
    //   min: 6,
    // },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    provider: {
      type: String,
      default: "email"
    },
    college: {
      type: String,
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: String,
      enum: ['Single', 'In a relationship', 'Married'],
    },
    // authStrategy: {
    //   type: String,
    //   default: "local",
    // },
    refreshToken: {
      type: [Session],
    },
  },
  { timestamps: true }
);

UserSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken
    return ret
  },
})

UserSchema.plugin(passportLocalMongoose)

export default mongoose.model("User", UserSchema);
