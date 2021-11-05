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

dotenv.config();
const app = express();
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
mongoose.connect(process.env.MONGO_URL, 
  { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("Database connected!"))
  .catch(error => console.log(error));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common")); // remove before deploying
app.use(cors(corsOptions));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/stories", storyRoute);

app.listen(5000, () => {
  console.log("Backend server is running!");
});
