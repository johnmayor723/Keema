// controllers/vendorController.js
const Vendor = require('../models/vendor'); // Your Mongoose or DB model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// Register vendor
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if vendor exists
        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) {
            return res.status(400).json({ message: 'Vendor already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save vendor
        const vendor = new Vendor({ name, email, password: hashedPassword });
        await vendor.save();

        res.status(201).json({ message: 'Vendor registered successfully', vendor });
    } catch (error) {
        res.status(500).json({ message: 'Error registering vendor', error: error.message });
    }
};

// Sign in vendor
exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const vendor = await Vendor.findOne({ email });
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: vendor._id, email: vendor.email }, 'JWT_SECRET', { expiresIn: '1d' });

        res.status(200).json({ message: 'Sign in successful', token, vendor });
    } catch (error) {
        res.status(500).json({ message: 'Error signing in vendor', error: error.message });
    }
};

// Get all vendors
exports.getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json({ message: 'Vendors retrieved successfully', vendors });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vendors', error: error.message });
    }
};

// Get vendor details
exports.getVendorDetails = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json({ vendor });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving vendor details', error: error.message });
    }
};

// Update vendor
exports.updateVendor = async (req, res) => {
    try {
        const { name, email, password, permissions } = req.body;

        const updateData = { name, email, permissions };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedVendor = await Vendor.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedVendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        res.status(200).json({ message: 'Vendor updated successfully', vendor: updatedVendor });
    } catch (error) {
        res.status(500).json({ message: 'Error updating vendor', error: error.message });
    }
};

// Delete vendor
exports.deleteVendor = async (req, res) => {
    try {
        const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!deletedVendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json({ message: 'Vendor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting vendor', error: error.message });
    }
};
