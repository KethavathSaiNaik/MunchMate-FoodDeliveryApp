const express = require('express');
const router = express.Router();
const { addProduct, updateProduct, deleteProduct } = require('../controllers/ProductController');

// Route to add product
router.post('/addproduct', addProduct);

// Route to update product
router.put('/updateproduct', updateProduct);

// Route to delete product
router.delete('/deleteproduct', deleteProduct);

module.exports = router;
