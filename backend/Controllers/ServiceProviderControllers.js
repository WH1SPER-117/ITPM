const PendingServiceProvider = require("../Model/PendingServiceProviderModel");
const ServiceProvider = require("../Model/ServiceProviderModel");

// Data insert - pending service provider
const addPendingServiceProvider = async (req, res, next) => {
    const { name, nic, dob, address, phoneNo, email, serviceCategory, service, username, password } = req.body;
    let pendingServiceProviderData;

    try {
        const formattedDob = new Date(dob).toLocaleDateString();
        pendingServiceProviderData = new PendingServiceProvider({
            name,
            nic,
            dob: formattedDob,
            address,
            phoneNo,
            email,
            serviceCategory,
            service,
            username,
            password,
            // createdDate and isApproved are set by schema defaults
        });
        await pendingServiceProviderData.save();
        return res.status(201).json({ pendingServiceProviderData });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Failed to add pending service provider", error: err.message });
    }
};

// Data insert - service provider (for virtual assistant or manual insert)
const addServiceProvider = async (req, res, next) => {
    const { name, nic, dob, address, phoneNo, email, serviceCategory, service, username, password } = req.body;
    let serviceProviderData;

    try {
        const formattedDob = new Date(dob).toLocaleDateString();
        serviceProviderData = new ServiceProvider({
            name,
            nic,
            dob: formattedDob,
            address,
            phoneNo,
            email,
            serviceCategory,
            service: service.join ? service.join(", ") : service, // Convert array to string if needed
            username,
            password,
        });
        await serviceProviderData.save();
        return res.status(201).json({ serviceProviderData });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Failed to add service provider", error: err.message });
    }
};

// Approve pending service provider and move to ServiceProvider collection
const approvePendingServiceProvider = async (req, res, next) => {
    const { id } = req.params; // Get pendingServiceProviderID from URL
    const { isApproved } = req.body; // Expect isApproved in body

    try {
        // Find pending service provider by ID
        const pendingProvider = await PendingServiceProvider.findOne({ pendingServiceProviderID: id });
        if (!pendingProvider) {
            return res.status(404).json({ message: "Pending service provider not found" });
        }

        // Check if isApproved is set to "Yes"
        if (isApproved !== "Yes") {
            return res.status(400).json({ message: "Service provider must be approved (isApproved: 'Yes')" });
        }

        // Update isApproved status
        pendingProvider.isApproved = isApproved;
        await pendingProvider.save();

        // Create new ServiceProvider record
        const serviceProviderData = new ServiceProvider({
            name: pendingProvider.name,
            nic: pendingProvider.nic,
            dob: pendingProvider.dob,
            address: pendingProvider.address,
            phoneNo: pendingProvider.phoneNo,
            email: pendingProvider.email,
            serviceCategory: pendingProvider.serviceCategory,
            service: pendingProvider.service.join(", "), // Convert array to string
            username: pendingProvider.username,
            password: pendingProvider.password,
            createdDate: pendingProvider.createdDate,
        });

        await serviceProviderData.save();

        // Delete from PendingServiceProvider collection
        await PendingServiceProvider.deleteOne({ pendingServiceProviderID: id });

        return res.status(201).json({
            message: "Service provider approved and moved to ServiceProvider collection",
            serviceProviderData,
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Failed to approve service provider", error: err.message });
    }
};

exports.addPendingServiceProvider = addPendingServiceProvider;
exports.addServiceProvider = addServiceProvider;
exports.approvePendingServiceProvider = approvePendingServiceProvider;