exports.checkPermission = (requiredPermission) => {
    return (req, res, next) => {
        const vendor = req.vendor; // Assuming vendor info is attached to the request

        if (!vendor) {
            return res.status(403).json({ message: 'Access denied. No vendor found.' });
        }

        if (vendor.permissions && vendor.permissions.includes(requiredPermission)) {
            next(); // Permission granted, proceed to the next middleware or route handler
        } else {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
    };
};

exports.assignPermissions = (vendor, permissions) => {
    if (!vendor || !Array.isArray(permissions)) {
        throw new Error('Invalid vendor or permissions array.');
    }

    vendor.permissions = permissions; // Assign the provided permissions to the vendor
};