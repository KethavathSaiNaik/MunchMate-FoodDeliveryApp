const Fooditem = require('../models/Fooditem');

// Add Product
const addProduct = async (req, res) => {
    try {
        await Fooditem.create({
            CategoryName: req.body.CategoryName,
            name: req.body.name,
            img: req.body.img,
            description: req.body.description,
            options: req.body.options,
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Fooditem.findOneAndUpdate(
            { name: req.body.name }, // Find product by name
            {
                CategoryName: req.body.CategoryName,
                name: req.body.name,
                img: req.body.img,
                description: req.body.description,
                options: req.body.options,
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false });
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to update product' });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Fooditem.findOneAndDelete({ name: req.body.name });

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete product' });
    }
};

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
};
