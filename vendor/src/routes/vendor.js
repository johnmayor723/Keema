const express = require('express');
const router = express.Router();

const {
    register,
    getVendorDetails,
    getAllVendors,
    adminRegister,
    adminSigninPage,
    adminSignupPage,
    updateVendor,
    deleteVendor,
    registerPage,
    signinPage // if you have a standard vendor signin page
} = require('../controllers/vendorController');

const { vendorAuth, isAdmin } = require('../middleware/vendorAuth');

// =======================
// Vendor Routes
// =======================

// Render vendor registration page
router.get('/register', registerPage);

// Vendor registration (POST)
router.post('/register', register);

// Vendor signin page (optional)
router.get('/signin', signinPage);

// Get all vendors
router.get('/', getAllVendors);

// Vendor dashboard (protected)
router.get('/dashboard/:id', vendorAuth, getVendorDetails);

// =======================
// Admin-Only Vendor Management
// =======================

// Update vendor (admin only)
router.put('/vendors/:id', vendorAuth, isAdmin, updateVendor);

// Delete vendor (admin only)
router.delete('/vendors/:id', vendorAuth, isAdmin, deleteVendor);

// =======================
// Vendor Admin Routes
// =======================

// Render admin signup page
router.get('/admin/signup', adminSignupPage);

// Admin registration (POST)
router.post('/admin/signup', adminRegister);

// Render admin signin page
router.get('/admin/signin', adminSigninPage);

// =======================
// Export router
// =======================
module.exports = router;

