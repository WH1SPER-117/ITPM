const ServiceCategory = require("../Model/ServiceCategory");
const PDFDocument = require('pdfkit');
const fs = require('fs').promises; // Use promises for async file operations

// Create new category
exports.createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName || categoryName.trim() === "") {
      return res.status(400).json({ error: "Category name is required" });
    }

    const existingCategory = await ServiceCategory.findOne({ categoryName });
    if (existingCategory) {
      return res.status(400).json({ error: "Category name already exists" });
    }

    const category = new ServiceCategory({ categoryName });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await ServiceCategory.find().sort({ categoryName: 1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a service to a category
exports.addService = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { serviceName } = req.body;

    if (!serviceName || serviceName.trim() === "") {
      return res.status(400).json({ error: "Service name is required" });
    }

    const category = await ServiceCategory.findOne({ categoryId });
    if (!category) return res.status(404).json({ error: "Category not found" });

    const duplicate = category.services.some(
      (s) => s.serviceName.toLowerCase() === serviceName.toLowerCase()
    );
    if (duplicate) return res.status(400).json({ error: "Service name already exists in this category." });

    category.services.push({ serviceName });
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update category name
exports.updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { categoryName } = req.body;

    if (!categoryName || categoryName.trim() === "") {
      return res.status(400).json({ error: "Category name is required" });
    }

    const updated = await ServiceCategory.findOneAndUpdate(
      { categoryId },
      { categoryName },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Category not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const deleted = await ServiceCategory.findOneAndDelete({ categoryId });

    if (!deleted) return res.status(404).json({ error: "Category not found" });

    res.status(200).json({ message: "Category deleted", deletedCategory: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a service name
exports.updateService = async (req, res) => {
  try {
    const { categoryId, serviceId } = req.params;
    const { serviceName } = req.body;

    if (!serviceName || serviceName.trim() === "") {
      return res.status(400).json({ error: "Service name is required" });
    }

    const category = await ServiceCategory.findOne({ categoryId });
    if (!category) return res.status(404).json({ error: "Category not found" });

    const service = category.services.find(s => s.serviceId === serviceId);
    if (!service) return res.status(404).json({ error: "Service not found" });

    const duplicate = category.services.some(
      s => s.serviceId !== serviceId && s.serviceName.toLowerCase() === serviceName.toLowerCase()
    );
    if (duplicate) {
      return res.status(400).json({ error: "Service name already exists in this category" });
    }

    service.serviceName = serviceName;
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

    if (!category) return res.status(404).json({ error: "Category not found" });

    const serviceExists = category.services.some(s => s.serviceId === serviceId);
    if (!serviceExists) {
      return res.status(404).json({ error: "Service not found" });
    }

    category.services = category.services.filter(s => s.serviceId !== serviceId);
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Increment click count
exports.incrementClickCount = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await ServiceCategory.findOneAndUpdate(
      { categoryId },
      { $inc: { clickCount: 1 } },
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

// Generate a downloadable PDF
exports.generateReport = async (req, res) => {
  try {
    const categories = await ServiceCategory.find().sort({ clickCount: -1 });

    const doc = new PDFDocument();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `Service_Popularity_Report_${timestamp}.pdf`;

    await fs.mkdir('./reports', { recursive: true });
    const stream = fs.createWriteStream(`./reports/${filename}`);
    doc.pipe(stream);

    doc.fontSize(20).text('Service Popularity Report', { align: 'center' }).moveDown();
    categories.forEach(cat => {
      doc.fontSize(14).text(`${cat.categoryName}: ${cat.clickCount} clicks`);
    });

    doc.end();

    stream.on('finish', () => {
      res.download(`./reports/${filename}`, (err) => {
        if (err) {
          console.error('Error sending file:', err);
        }
        // Optionally delete the file after download
        // fs.unlink(`./reports/${filename}`).catch(err => console.error('Error deleting file:', err));
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};