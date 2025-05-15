const ServiceRequest = require('../models/ServiceRequest');

exports.createServiceRequest = async (req, res) => {
  try {
    const { categoryName, serviceName, issueDescription, urgency } = req.body;
    const request = new ServiceRequest({ categoryName, serviceName, issueDescription, urgency });
    await request.save();
    res.status(201).json({ message: 'Service request submitted successfully', request });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit service request', details: error.message });
  }
};
