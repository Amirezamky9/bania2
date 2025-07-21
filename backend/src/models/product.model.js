import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Product description is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"]
    },
    stock: {
        type: Number,
        required: [true, "Stock quantity is required"],
        min: [0, "Stock cannot be negative"],
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Category is required"]
    },
    images: [{
        type: String
    }]
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
