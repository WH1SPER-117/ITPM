const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./Routes/UserRoutes");
const serviceCategoryRoutes = require("./Routes/ServiceCategoryRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = "mongodb+srv://admin:queickfixeradmin123@quickfixer.w5ect.mongodb.net/";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// Routes
app.use("/users", userRoutes);
app.use("/api/categories", serviceCategoryRoutes);

// Server Port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});


