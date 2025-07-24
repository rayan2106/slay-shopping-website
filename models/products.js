import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    price: Number,
    category: String,
    brand: String,
    image: String,
})

const products = mongoose.models.Product || mongoose.model("Product", productSchema);

export default products;