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

// Fetch all pending service providers
const getPendingServiceProviders = async (req, res, next) => {
  try {
    const pendingProviders = await PendingServiceProvider.find({ isApproved: "No" });
    return res.status(200).json(pendingProviders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch pending service providers", error: err.message });
  }
};

// Fetch details of a specific pending service provider
const getPendingServiceProviderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const provider = await PendingServiceProvider.findOne({ pendingServiceProviderID: id });
    if (!provider) {
      return res.status(404).json({ message: "Pending service provider not found" });
    }
    return res.status(200).json(provider);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch provider details", error: err.message });
  }
};

// Login service provider
const loginServiceProvider = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const provider = await ServiceProvider.findOne({ username, password });
    if (!provider) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    return res.status(200).json({ message: "Login successful", provider });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to login", error: err.message });
  }
};

exports.addPendingServiceProvider = addPendingServiceProvider;
exports.addServiceProvider = addServiceProvider;
exports.approvePendingServiceProvider = approvePendingServiceProvider;
exports.getPendingServiceProviders = getPendingServiceProviders;
exports.getPendingServiceProviderById = getPendingServiceProviderById;
exports.loginServiceProvider = loginServiceProvider; 