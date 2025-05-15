// Routes/ServiceCatalogRoutes.js
const express = require("express");
const {
  createServiceCategory,
} = require("../Controllers/ServiceCatalogControllers");

const router = express.Router();

// Route to create a service category
router.post("/service-categories", createServiceCategory);

module.exports = router;