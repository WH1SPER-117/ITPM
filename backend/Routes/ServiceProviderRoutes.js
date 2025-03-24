const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    registerServiceProvider,
    approveServiceProvider,
    getPendingServiceProviders,
    getApprovedServiceProviders,
    rejectPendingServiceProvider
} = require('../Controllers/ServiceProviderControllers');

// Multer storage configuration for file uploads (police letter & profile photo)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// File filter (to allow only PDFs for police letter & images for profile photo)
const fileFilter = (req, file, cb) => {
    if (file.fieldname === "policeLetter" && file.mimetype !== "application/pdf") {
        return cb(new Error("Only PDF files are allowed for the police letter."), false);
    }
    if (file.fieldname === "profilePhoto" && !file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed for the profile photo."), false);
    }
    cb(null, true);
};

const upload = multer({ storage, fileFilter });

/**
 * @route   POST /api/service-provider/register
 * @desc    Register a new service provider (Pending Approval)
 */
router.post('/register', upload.fields([{ name: 'policeLetter' }, { name: 'profilePhoto' }]), registerServiceProvider);

/**
 * @route   GET /api/service-provider/pending
 * @desc    Get all pending service providers (For Admin Approval)
 */
router.get('/pending', getPendingServiceProviders);

/**
 * @route   GET /api/service-provider/approved
 * @desc    Get all approved service providers
 */
router.get('/approved', getApprovedServiceProviders);

/**
 * @route   PUT /api/service-provider/approve/:id
 * @desc    Approve a pending service provider
 */
router.put('/approve/:id', approveServiceProvider);

/**
 * @route   DELETE /api/service-provider/reject/:id
 * @desc    Reject a pending service provider
 */
router.delete('/reject/:id', rejectPendingServiceProvider);

module.exports = router;
