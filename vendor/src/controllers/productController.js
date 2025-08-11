const axios = require('axios');

// Create Product
exports.createProduct = async function (req, res) {
    try {
        const { name, description, price, vendorId } = req.body;

        if (!name || !description || !price || !vendorId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const response = await axios.post('https://keema.com.ng/api/product', {
            name,
            description,
            price,
            vendor: vendorId
        });

        return res.status(201).json({ message: 'Product created successfully', product: response.data });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.response?.data || error.message });
    }
};

// Get Products
exports.getProducts = async function (req, res) {
    try {
        const vendorId = req.vendor?.id || req.query.vendorId;
        if (!vendorId) {
            return res.status(400).json({ message: 'Vendor ID is required' });
        }

        const response = await axios.get('https://keema.com.ng/api/product', {
            params: { vendor: vendorId }
        });

        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.response?.data || error.message });
    }
};
