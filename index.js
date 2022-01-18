import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet"
import morgan from "morgan";
import { createServer } from "http";
import { Server } from "socket.io"
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import storyRoute from "./routes/stories.js";
import chatRoute from "./routes/chats.js";
import notificationRoute from "./routes/notifications.js";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import College from "./models/College.js";
import User from "./models/User.js";
import Chat from "./models/Chat.js";
import { createNotification, readNotifications } from "./controllers/notificationsController.js";

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
  origin: process.env.CLIENT_URL, 
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
app.use("/api/chats", chatRoute);
app.use("/api/notifications", notificationRoute);
app.get("/api/colleges", async (req, res)=>{
  const colleges = await College.find({})
  res.status(200).json(colleges)
})

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL, 
    credentials:true,
  }
});

let users = [];

const addUser = async(userId, socketId) => {
  if(!users.some((user) => user.userId === userId)){
    users.push({ userId, socketId });
    await User.findByIdAndUpdate(userId, {lastSeen: "online"})
  }
};

const removeUser = async(socketId) => {
  const _user = await users.find((user)=>user.socketId === socketId)
  _user && await User.findByIdAndUpdate(_user?.userId, {lastSeen: new Date().toISOString()})
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", async (socket) => {
  //when ceonnect
  console.log("a user connected.");
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
  });

  //send and get message
  socket.on("sendMessage", ({ from, to, message }) => {
    const user = getUser(to);
    io.to(user?.socketId).emit("getMessage", {
      from,
      message,
      read: false, 
      createdAt: Date.now()
    });
  });

  //send and get notifications
  socket.on("sendNotification", (data) => {
    const user = getUser(data.to);
    createNotification(data)
    io.to(user?.socketId).emit("newNotification");
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
  });
  
  //read messages
  socket.on("readMsgs", async ({chatId, from}) => {
    const user = getUser(from);
    io.to(user?.socketId).emit("msgsRead", chatId)
    var chat = await Chat.findById(chatId)
    chat.messages.forEach(m => {
      if(m.from === from && m.read === false){
        m.read=true
      }
    })
    chat.save()
  });
  //read notifications
  socket.on("readNotifications", async ({id}) => {
    readNotifications(id)
  })
  
  //send post
  socket.on("sendPost", async (data) => {
    io.emit("newPost", data)
  })
  //send like
  socket.on("sendLike", async (data) => {
    socket.broadcast.emit("newLike", data)
  })
  //send comment
  socket.on("sendComment", async (data) => {
    socket.broadcast.emit("newComment", data)
  })
  //delete post
  socket.on("sendDeletePost", async (data) => {
    socket.broadcast.emit("deletePost", data)
  })
  //delete comment
  socket.on("sendDeleteComment", async (data) => {
    socket.broadcast.emit("deleteComment", data)
  })

});

server.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
