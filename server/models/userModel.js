import mongoose, { Schema } from "mongoose";


const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
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
            minlength: 6,
            select: true,
        },
        location: String,
        profileUrl: String,
        profession: String,
        friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        views: [{
            viewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            viewDate: Date,
        }],
        verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;