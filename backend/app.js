//queickfixeradmin123

const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoutes");

const app = express();

//Middleware
app.use(express.json());
app.use("/users",router);


mongoose.connect("mongodb+srv://admin:queickfixeradmin123@quickfixer.w5ect.mongodb.net/")
.then(()=> console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=> console.log((err)));