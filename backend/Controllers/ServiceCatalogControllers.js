// Controllers/ServiceCatalogControllers.js
const ServiceCategory = require("../Model/ServiceCatalogModel");

// Create a new service category
exports.createServiceCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate input
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    // Check if category already exists
    const existingCategory = await ServiceCategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Service category already exists",
      });
    }

    // Create new category
    const newCategory = await ServiceCategory.create({ name, description });

    res.status(201).json({
      success: true,
      message: "Service category created successfully",
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};