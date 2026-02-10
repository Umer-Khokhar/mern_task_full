import mongoose from "mongoose"

const productModel = new mongoose.Schema({
    image: {type: String},
    productName: {type: String},
    category: {type: String},
    price: {type: Number},
    description: {type: String}
}, {timestamps: true})

export const Products = mongoose.model("product", productModel)