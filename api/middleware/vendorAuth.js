const Vendor = require('../models/vendor');
const { checkPermissions } = require('../../vendor/src/utils/permissions');

// Middleware to authenticate vendor
exports.vendorAuth = async (req, res, next) => {
    try {
        const vendorId = req.session.vendorId; // Assuming vendor ID is stored in session
        if (!vendorId) {
            return res.status(401).json({ message: 'Unauthorized access. Please register or log in.' });
        }

        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found.' });
        }

        req.vendor = vendor; // Attach vendor info to request
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Middleware to check vendor permissions
exports.checkVendorPermissions = (requiredPermission) => {
    return (req, res, next) => {
        if (!req.vendor || !checkPermissions(req.vendor.permissions, requiredPermission)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions.' });
        }
        next();
    };
};
// Middleware to check if vendor permission is exactly "admin"
exports.isAdmin = (req, res, next) => {
    if (!req.vendor || req.vendor.permissions !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admin access only.' });
    }
    next();
};
