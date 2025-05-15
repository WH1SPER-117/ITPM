const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const userRoutes = require("./Routes/UserRoutes");
const serviceCategoryRoutes = require("./Routes/ServiceCategoryRoutes");
const serviceRequestRoutes = require("./Routes/ServiceRequestRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/ServiceCategory", serviceCategoryRoutes );
app.use('/api/service-requests', serviceRequestRoutes);

// MongoDB Connection
mongoose.connect("mongodb+srv://admin:queickfixeradmin123@quickfixer.w5ect.mongodb.net/")
.then(()=> console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=> console.log((err)));
// Routes

// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});


