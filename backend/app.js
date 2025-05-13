//queickfixeradmin123

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./Routes/UserRoutes");
const ServiceProviderRouter = require("./Routes/ServiceProviderRoutes");
const chats = require("./Data/data");
const AllUserRoutes = require("./Routes/AllUserRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");

const { notFound, errorHandler } = require("./Middlewares/errorMiddleware");
const asyncHandler = require("express-async-handler");

const app = express();

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" })); // Adjust to your frontend URL

//Middleware
app.use(express.json());
app.use("/users", router);
app.use("/serviceProviders", ServiceProviderRouter);

dotenv.config();
app.use("/allUsers", AllUserRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  console.log(req.params.id);
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

app.use(notFound);
app.use(errorHandler);

//MongoDB connection
const server = mongoose
  .connect("mongodb+srv://admin:test123@cluster0.udmxtyy.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
});
