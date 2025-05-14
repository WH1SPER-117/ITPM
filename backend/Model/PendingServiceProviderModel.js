const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const PendingServiceProviderSchema = new Schema({
    pendingServiceProviderID: {
        type: Number,
        unique: true,
    },
    name: { type: String, required: true },
    nic: { type: String, required: true, unique: true },
    dob: { type: String, required: true }, // Changed to String
    address: { type: String, required: true },
    phoneNo: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    serviceCategory: { type: String, required: true },
    service: { type: [String], required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdDate: {
        type: String,
        default: () => new Date().toLocaleDateString(), // Set as string
    },
    isApproved: {
        type: String,
        enum: ["Yes", "No"],
        default: "No",
    }
});

PendingServiceProviderSchema.plugin(AutoIncrement, { inc_field: "pendingServiceProviderID" });

module.exports = mongoose.model('PendingServiceProvider', PendingServiceProviderSchema);
