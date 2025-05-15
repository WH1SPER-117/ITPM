const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  serviceName: { type: String, required: true },
  issueDescription: { type: String, required: true },
  urgency: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
