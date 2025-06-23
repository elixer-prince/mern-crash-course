import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}, null, null);

        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.log(`Error in getAllProducts: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id, null, null);

        if (!product) {
            return res.status(404).json({
               success: false,
               message: "Product not found!"
            });
        }

        res.status(200).json({
           success: true,
           data:  product
        });
    } catch (error) {
        console.log(`Error in getProductById: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const product = req.body;

        if (!product.name || !product.price || !product.image) {
            return res.status(400).json({
               success: false,
                message: "Please provide all fields!"
            });
        }

        const newProduct = new Product(product);

        await newProduct.save();

        res.status(201).json({
            success: true,
            data: newProduct
        });
    } catch (error) {
        console.log(`Error in createProduct: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = req.body;

        if (!product.name || !product.image || !product.price) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields!"
            });
        }

        // noinspection JSCheckFunctionSignatures
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {
            new: true
        });

        if (!updatedProduct) {
            return res.status(404).json({
               success: false,
               message: "Product not found!"
            });
        }

        res.status(200).json({
           success: true,
            message: "Product updated successfully!",
            data: updatedProduct
        });
    } catch (error) {
        console.log(`Error in updateProduct: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id, null);

        if (!deletedProduct) {
            res.status(404).json({
                success: false,
                message: "Product not found!"
            })
        }

        res.status(200).json({
           success: true,
           message: "Product deleted successfully!",
            data: deletedProduct
        });
    } catch (error) {
        console.log(`Error in deleteProduct: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
};