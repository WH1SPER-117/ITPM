const ServiceCategory = require("../Model/ServiceCategory");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { categoryId, categoryName, services } = req.body;
    const category = new ServiceCategory({ categoryId, categoryName, services });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await ServiceCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a service to a category
exports.addService = async (req, res) => {
  try {
    const { categoryId, serviceId, serviceName } = req.body;
    const category = await ServiceCategory.findOne({ categoryId });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.services.push({ serviceId, serviceName });
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a service from a category
exports.deleteService = async (req, res) => {
  try {
    const { categoryId, serviceId } = req.params;
    const category = await ServiceCategory.findOne({ categoryId });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.services = category.services.filter(service => service.serviceId !== serviceId);
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a category name
exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { categoryName } = req.body;
    
    const category = await ServiceCategory.findOneAndUpdate(
      { categoryId },
      { categoryName },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await ServiceCategory.findOneAndDelete({ categoryId });

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a service name
exports.updateService = async (req, res) => {
  try {
    const { categoryId, serviceId } = req.params;
    const { serviceName } = req.body;

    const category = await ServiceCategory.findOne({ categoryId });
    if (!category) return res.status(404).json({ error: "Category not found" });

    const service = category.services.find(service => service.serviceId === serviceId);
    if (!service) return res.status(404).json({ error: "Service not found" });

    service.serviceName = serviceName;
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  try {
    const { categoryId, serviceId } = req.params;
    const category = await ServiceCategory.findOne({ categoryId });

    if (!category) return res.status(404).json({ error: "Category not found" });

    category.services = category.services.filter(service => service.serviceId !== serviceId);
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

