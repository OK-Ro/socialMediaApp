import mongoose,{Schema} from "mongoose";

// schema
const emailVerificationSchema = Schema(
    {
        userId: String,
        token: String,
        createdAt: Date,
        expiresAt: Date,
      
    },
);

const verification = mongoose.model('verification', emailVerificationSchema);

export default verification;
