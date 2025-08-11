const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    permissions: {
        type: [String],
        default: ['vendor'], // Default permission for new vendors
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;