import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: [true, "Slug is required"],
        unique: true,
        lowercase: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    }
}, { timestamps: true });

// Pre-validation hook to generate slug from name if not provided
categorySchema.pre('validate', function(next) {
    if (this.name && !this.slug) {
        this.slug = this.name.toLowerCase().split(' ').join('-');
    }
    next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
