const axios = require('axios');




exports.registerPage = async function (req, res) {
// get Register a vendor page
    res.render('vendor/register', { title: 'Vendor Registration' });
}
exports.signinPage = async function (req, res) {
    // Get Sign In page
    res.render('vendor/signin', { title: 'Vendor Sign In' });
}
exports.adminSigninPage = async function (req, res) {
    // Get Vendor Admin Sign In page
    res.render('vendor/admin/signin', { title: 'Vendor Admin Sign In' });
}
exports.adminSignupPage = async function (req, res) {
    // Get Vendor Admin Sign Up page
    res.render('vendor/admin/signup', { title: 'Vendor Admin Sign Up' });
}

exports.register = async function (req, res) {
    try {
        const { name, email, password } = req.body;
        const response = await axios.post('https://keema.com.ng/api/vendors/register', {
            name,
            email,
            password
        });
        res.status(201).json({ message: 'Vendor registered successfully', data: response.data });
    } catch (error) {
        res.status(500).json({ message: 'Error registering vendor', error: error.message });
    }
};
exports.updateVendor = async function (req, res) {
    try {
        const { id } = req.params; // vendor ID from URL
        const { name, email, password, permissions } = req.body; // any fields to update

        const response = await axios.put(`https://keema.com.ng/api/vendors/${id}`, {
            name,
            email,
            password,
            permissions
        });

        res.status(200).json({
            message: 'Vendor updated successfully',
            data: response.data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating vendor',
            error: error.message
        });
    }
};
exports.deleteVendor = async function (req, res) {
    try {
        const { id } = req.params; // vendor ID from URL

        await axios.delete(`https://keema.com.ng/api/vendors/${id}`);

        res.status(200).json({
            message: 'Vendor deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting vendor',
            error: error.message
        });
    }
};

exports.adminRegister = async function (req, res) {
    try {
        const { name, email, password } = req.body;

        const response = await axios.post('https://keema.com.ng/api/vendors/register', {
            name,
            email,
            password,
            permissions: ['admin'] // Set admin permissions
        });

        res.status(201).json({
            message: 'Vendor Admin registered successfully',
            data: response.data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error registering vendor admin',
            error: error.message
        });
    }
};


// Vendor sign-in
exports.signIn = async function (req, res) {
    try {
        const { email, password } = req.body;
        const response = await axios.post('https://keema.com.ng/api/vendors/login', {
            email,
            password
        });
        res.status(200).json({ message: 'Vendor signed in successfully', data: response.data });
    } catch (error) {
        res.status(401).json({ message: 'Error signing in vendor', error: error.message });
    }
};
// Get all vendors
exports.getAllVendors = async function (req, res) {
    try {
        const response = await axios.get('https://keema.com.ng/api/vendors');
        res.status(200).json({ message: 'Vendors retrieved successfully', data: response.data });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vendors', error: error.message });
    }
};



// Get vendor details
exports.getVendorDetails = async function (req, res) {
    try {
        const vendorId = req.params.id;
        const response = await axios.get(`https://keema.com.ng/api/vendors/${vendorId}`);
        res.status(200).json({ vendor: response.data });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving vendor details', error: error.message });
    }
};
