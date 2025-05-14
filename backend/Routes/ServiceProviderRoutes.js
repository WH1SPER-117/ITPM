const express = require('express');
const serviceProviderRouter = express.Router();
//insert models
const pendingServiceProvider = require("../Model/PendingServiceProviderModel")
const serviceProvider = require("../Model/ServiceProviderModel")

const serviceProviderController= require('../Controllers/ServiceProviderControllers');

//create route path
serviceProviderRouter.post("/register", serviceProviderController.addPendingServiceProvider);
serviceProviderRouter.post("/addServiceProvider", serviceProviderController.addServiceProvider);
serviceProviderRouter.patch("/approve/:id", serviceProviderController.approvePendingServiceProvider);
serviceProviderRouter.get("/pending", serviceProviderController.getPendingServiceProviders); 
serviceProviderRouter.get("/pending/:id", serviceProviderController.getPendingServiceProviderById); 
serviceProviderRouter.post("/login", serviceProviderController.loginServiceProvider);
serviceProviderRouter.delete("/pending/:id", serviceProviderController.deletePendingServiceProvider);


module.exports = serviceProviderRouter;



