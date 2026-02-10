import createHttpError from "http-errors";
import { Products } from "../models/products.model.js";



export const getProducts = async (req, res, next) => {
    try {
        const allProducts = await Products.find()
        res.status(200).json(allProducts)
    } catch (error) {
        throw new Error(createHttpError(500, error.message))
    }
}


export const createProducts = async (req, res, next) => {
    try {
        console.log(req.files)
        console.log(req.body)
        const { productName, category, price, description } = req.body;
        
        // if (!req.files || !req.files.image) {
        //     throw new Error('Product image is required');
        // }
        // const imageFile = req.files.image[0];
        
        // const imagePath = `/data/uploads/${imageFile.filename}`;

        const createProduct = await Products.create({
        //    image: imagePath,
            productName,
            category,
            price,
            description
        });
        res.status(201).json({
            message: "Successfully created the product",
            product: createProduct
        });
    } catch (error) {
        // if (req.files && req.files.image) {
        //     const fs = require('fs');
        //     fs.unlinkSync(req.files.image[0].path);
        // }
        
        next(createHttpError(500, error.message));
    }
};



export const updateProducts = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(req.files);
        console.log(req.body);
        
        const { productName, category, price, description } = req.body;
        const existingProduct = await Products.findById(id);
        if (!existingProduct) {
            return next(createHttpError(404, 'Product not found'));
        }
        
        existingProduct.productName = productName || existingProduct.productName;
        existingProduct.category = category || existingProduct.category;
        existingProduct.price = price || existingProduct.price;
        existingProduct.description = description || existingProduct.description;
        
        if (req.files && req.files.image) {
            const imageFile = req.files.image[0];
            const imagePath = `/data/uploads/${imageFile.filename}`;
            
            
            existingProduct.image = imagePath;
        }
        
        await existingProduct.save();
        
        res.status(200).json({
            message: "Successfully updated the product",
            product: existingProduct
        });
    } catch (error) {
        if (req.files && req.files.image) {
            const fs = await import('fs');
            fs.default.unlinkSync(req.files.image[0].path);
        }
        
        next(createHttpError(500, error.message));
    }
};




export const deleteProduct = async (req, res, next) => {
    try {
        const {id} = req.params
        const product = await Products.findById(id);
        
        if (!product) {
            return next(createHttpError(404, 'Product not found'));
        }
       const deletedProduct = await Products.findByIdAndDelete({_id: id})
       res.status(200).json({
        message: "Successfully deleted the product",
        deletedProduct: deletedProduct
       }) 
    } catch (error) {
        throw new Error(createHttpError(500, error.message))
    }
}