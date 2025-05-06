//queickfixeradmin123

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./Routes/UserRoutes");
const ServiceProviderRouter = require("./Routes/ServiceProviderRoutes");
const chats = require("./Data/data");
const AllUserRoutes = require("./Routes/AllUserRoutes");

const { notFound, errorHandler } = require("./Middlewares/errorMiddleware");
const asyncHandler = require("express-async-handler");

const app = express();

//Middleware
app.use(express.json());
app.use("/users", router);
app.use("/serviceProviders", ServiceProviderRouter);
app.use("/allUsers", AllUserRoutes);
dotenv.config();

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
mongoose
  .connect("mongodb+srv://admin:test123@cluster0.udmxtyy.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
