const express = require('express');
const router = express.Router();
const { createServiceRequest } = require('../controllers/ServiceRequestController');

router.post('/', createServiceRequest);

module.exports = router;
