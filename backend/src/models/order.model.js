import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    product: {
        type: Object,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity cannot be less than 1."]
    },
    price: {
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        enum: ['PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED'],
        default: 'PROCESSING'
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
