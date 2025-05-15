const express = require("express");
const router = express.Router();
const serviceCategoryController = require("../Controllers/ServiceCategoryController");

router.post("/", serviceCategoryController.createCategory);
router.get("/", serviceCategoryController.getCategories);
router.post("/:categoryId/services", serviceCategoryController.addService);
router.put("/:categoryId", serviceCategoryController.updateCategory);
router.delete("/:categoryId", serviceCategoryController.deleteCategory);
router.put("/:categoryId/services/:serviceId", serviceCategoryController.updateService);
router.delete("/:categoryId/services/:serviceId", serviceCategoryController.deleteService);
router.patch("/click/:categoryId", serviceCategoryController.incrementClickCount);
router.get("/report/pdf", serviceCategoryController.generateReport);

module.exports = router;