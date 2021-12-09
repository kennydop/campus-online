import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Session = new mongoose.Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});


const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      min: 3,
      max: 20,
      unique: true,
    },
    name: {
      type: String,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      max: 50,
      unique: true,
    },
    gender: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    coverPicture: {
      type: String,
    },
    provider: {
      type: String,
      default: "email"
    },
    providerId:{
      type: String
    },
    providerToken:{
      type: String
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
      max: 60,
    },
    relationship: {
      type: String,
      enum: ['Single', 'In a relationship', 'Married'],
    },
    birthday: {
      type: String,
    },
    level: {
      type: String,
    },
    posts: {
      type: Number,
    },
    preferences: {
      type: {},
    },
    refreshToken: {
      type: [Session],
    },
  },
  { timestamps: true }
);

UserSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken
    delete ret.updatedAt
    delete ret.__v
    delete ret.provider
    return ret
  },
})

UserSchema.plugin(passportLocalMongoose)

export default mongoose.model("User", UserSchema);
