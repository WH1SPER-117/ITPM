//queickfixeradmin123

const express = require("express");
const mongoose = require("mongoose");
const app = express();

//middleware
app.use("/",(req, res, next) => {
    res.send("It's working");
})

mongoose.connect("mongodb+srv://admin:queickfixeradmin123@quickfixer.w5ect.mongodb.net/")
.then(()=> console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=> console.log((err)));