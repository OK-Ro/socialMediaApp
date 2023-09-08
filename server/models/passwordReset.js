import mongoose,{Schema} from "mongoose";

// schema
const passwordResettSchema  = Schema(
    {
        userId: {type: String, unique: true },
        email: {type: String, unique: true },
        token:String,
        createdAt: Date,
        expiresAt: Date,
      
    },
);

const passwordReset = mongoose.model('passwordReset', passwordResettSchema);

export default passwordReset;
