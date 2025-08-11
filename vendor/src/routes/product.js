const express = require('express');
const router = express.Router();

const { createProduct, getProducts } = require('../controllers/productController');
const { vendorAuth } = require('../../../api/middleware/vendorAuth');

// Route for creating a product
router.post('/create', vendorAuth, createProduct);

module.exports = router;
