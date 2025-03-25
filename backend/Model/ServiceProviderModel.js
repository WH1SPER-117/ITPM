const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ServiceProviderSchema = new Schema({
    serviceProviderID: {
        type: Number,
        unique: true,
    },
    name: { type: String, required: true },
    nic: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    address: { 
        postCode: { type: String, required: true },
        addressLine: { type: String, required: true },
        city: { type: String, required: true }
    },
    phoneNo: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    serviceCategory: { type: String, required: true },
    service: { type: String, required: true },
    policeLetter: { type: String, required: true }, // File path
    profilePhoto: { type: String, required: false }, // File path (Optional)
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

ServiceProviderSchema.plugin(AutoIncrement, { inc_field: "serviceProviderID" });

module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);
