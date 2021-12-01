import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet"
import morgan from "morgan";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import storyRoute from "./routes/stories.js";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import College from "./models/College.js";

import("./authStrategies/JWTStrategry.js");
import("./authStrategies/authenticate.js");
import("./authStrategies/LocalStrategy.js");
import("./authStrategies/SocialsStrategy.js");
if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  dotenv.config();
}

const app = express();
const corsOptions ={
  origin: true, 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
mongoose.connect(process.env.MONGO_URL, 
  { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("Database connected!"))
  .catch(error => console.log(error));

//middleware
app.use(express.json({ limit: '70mb' }));
app.use(helmet());
app.use(morgan("common")); // remove before deploying
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(cors(corsOptions));
app.use(
  cookieSession({ name: "session", keys: [process.env.COOKIE_SECRET], maxAge: 24 * 60 * 60 * 100 })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/stories", storyRoute);
app.get("/api/colleges", async (req, res)=>{
  const colleges = await College.find({})
  res.status(200).json(colleges)
})

app.listen(5000, () => {
  console.log("Backend server is running!");
});
