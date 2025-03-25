const express = require('express');
const serviceProviderRouter = express.Router();
//insert models
const pendingServiceProvider = require("../Model/PendingServiceProviderModel")

const serviceProviderController= require('../Controllers/ServiceProviderControllers');

//create route path
serviceProviderRouter.post("/register", serviceProviderController.addPendingServiceProvider);


module.exports = serviceProviderRouter;
