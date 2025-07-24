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
            return !this.verified
        },
    },

    otpExpires: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
