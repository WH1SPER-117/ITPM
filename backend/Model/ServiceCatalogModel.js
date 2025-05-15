// Models/ServiceCatalogModel.js
const mongoose = require("mongoose");

const serviceCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Service category name is required"],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  services: [{
    serviceId: {
      type: String,
      required: true, // Ensure serviceId is not null
      unique: true, // If uniqueness is needed
    },
    // Other service fields
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ServiceCategory = mongoose.model("ServiceCategory", serviceCategorySchema);

module.exports = ServiceCategory;