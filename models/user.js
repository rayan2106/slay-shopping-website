import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    cart: [{
        productId: mongoose.Schema.Types.ObjectId,
        quantity: Number,
    }],

    wishlist: [{
        productId: mongoose.Schema.Types.ObjectId,
    }],

    verified: {
        type: Boolean,
        default: false,
    },

    otp: {
        type: String,
        required: function () {
            return !this.verified;
        },
    },

    otpExpires: {
        type: Date,
        default: null,
    },

    // ➕ New Fields

    profilePicture: {
        type: String,
        default: '', // You can use a default avatar URL
    },

    phone: {
        type: String,
        default: '',
    },

    address: {
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        zip: { type: String, default: '' },
        country: { type: String, default: '' },
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
