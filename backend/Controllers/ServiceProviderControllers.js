const bcrypt = require('bcrypt');
const PendingServiceProvider = require('../Models/PendingServiceProviderModel');
const ServiceProvider = require('../Models/ServiceProviderModel');

/**
 * Register a new service provider (Pending Approval)
 */
exports.registerServiceProvider = async (req, res) => {
    try {
        const { name, nic, dob, address, username, password, phoneNo, email, serviceCategory, service } = req.body;

        const policeLetterPath = req.files['policeLetter'] ? req.files['policeLetter'][0].path : null;
        const profilePhotoPath = req.files['profilePhoto'] ? req.files['profilePhoto'][0].path : null;

        if (!policeLetterPath || !profilePhotoPath) {
            return res.status(400).json({ message: "Police letter and profile photo are required." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newPendingProvider = new PendingServiceProvider({
            name,
            nic,
            dob,
            policeLetter: policeLetterPath,
            profilePhoto: profilePhotoPath,
            address: JSON.parse(address),
            username,
            password: hashedPassword,
            phoneNo,
            email,
            serviceCategory,
            service
        });

        await newPendingProvider.save();
        res.status(201).json({ message: "Registration submitted for approval." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering service provider." });
    }
};

/**
 * Approve a pending service provider and move to approved list
 */
exports.approveServiceProvider = async (req, res) => {
    try {
        const { id } = req.params;

        // Find pending service provider
        const pendingProvider = await PendingServiceProvider.findById(id);
        if (!pendingProvider) {
            return res.status(404).json({ message: "Pending service provider not found." });
        }

        // Move to approved list
        const approvedProvider = new ServiceProvider({
            name: pendingProvider.name,
            nic: pendingProvider.nic,
            dob: pendingProvider.dob,
            policeLetter: pendingProvider.policeLetter,
            profilePhoto: pendingProvider.profilePhoto,
            address: pendingProvider.address,
            username: pendingProvider.username,
            password: pendingProvider.password,
            phoneNo: pendingProvider.phoneNo,
            email: pendingProvider.email,
            serviceCategory: pendingProvider.serviceCategory,
            service: pendingProvider.service
        });

        await approvedProvider.save();
        await PendingServiceProvider.findByIdAndDelete(id);

        res.status(200).json({ message: "Service provider approved successfully." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error approving service provider." });
    }
};

/**
 * Get all pending service providers
 */
exports.getPendingServiceProviders = async (req, res) => {
    try {
        const pendingProviders = await PendingServiceProvider.find();
        res.status(200).json(pendingProviders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching pending service providers." });
    }
};

/**
 * Get all approved service providers
 */
exports.getApprovedServiceProviders = async (req, res) => {
    try {
        const approvedProviders = await ServiceProvider.find();
        res.status(200).json(approvedProviders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching approved service providers." });
    }
};

/**
 * Reject a pending service provider (Delete from pending collection)
 */
exports.rejectPendingServiceProvider = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProvider = await PendingServiceProvider.findByIdAndDelete(id);

        if (!deletedProvider) {
            return res.status(404).json({ message: "Pending service provider not found." });
        }

        res.status(200).json({ message: "Service provider rejected and removed." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error rejecting service provider." });
    }
};
