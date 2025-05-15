const ServiceCategory = require("../Model/ServiceCategory");
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create new category
exports.createCategory = async (req, res) => {
  try {
    const { categoryId, categoryName, services } = req.body;
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
    const categories = await ServiceCategory.find();
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

    const category = await ServiceCategory.findById(categoryId);
    if (!category) return res.status(404).json({ error: "Category not found" });

    const duplicate = category.services.some(
      (s) => s.serviceName.toLowerCase() === serviceName.toLowerCase()
    );
    if (duplicate) return res.status(400).json({ error: "Service name already exists in this category." });

    category.services.push({ serviceName }); // serviceId is auto-generated
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

    const service = category.services.find(s => s.serviceId === serviceId);
    if (!service) return res.status(404).json({ error: "Service not found" });

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

    category.services = category.services.filter(s => s.serviceId !== serviceId);
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 

//Generate a downloadable pdf
exports.generateReport = async (req, res) => {
  try {
    const categories = await ServiceCategory.find().sort({ clickCount: -1 });

    const doc = new PDFDocument();
    const filename = 'Service_Popularity_Report.pdf';
    const stream = fs.createWriteStream(`./reports/${filename}`);
    doc.pipe(stream);

    doc.fontSize(20).text('Service Popularity Report', { align: 'center' }).moveDown();
    categories.forEach(cat => {
      doc.fontSize(14).text(`${cat.categoryName}: ${cat.clickCount} clicks`);
    });

    doc.end();

    stream.on('finish', () => {
      res.download(`./reports/${filename}`);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
