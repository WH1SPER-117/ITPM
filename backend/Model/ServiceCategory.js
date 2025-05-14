const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const serviceSchema = new mongoose.Schema({
  serviceId: {
    type: String,
    default: uuidv4,
    unique: true
  },
  serviceName: {
    type: String,
    required: true,
    trim: true
  }
});

const serviceCategorySchema = new mongoose.Schema({
  categoryId: {
    type: String,
    default: uuidv4,
    unique: true
  },
  categoryName: {
    type: String,
    required: true,
    trim: true
  },
  services: {
    type: [serviceSchema],
    validate: {
      validator: function (value) {
        const ids = value.map(s => s.serviceId);
        return ids.length === new Set(ids).size;
      },
      message: "Duplicate serviceId found in services."
    }
  }
}, { timestamps: true });

module.exports = mongoose.model("ServiceCategory", serviceCategorySchema);
