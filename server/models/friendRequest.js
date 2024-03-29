import mongoose,{Schema} from "mongoose";

// schema
const requestSchema = Schema(
    {
        requestTo: { type: Schema.Types.ObjectId, ref: 'Users' },
        requestFrom: { type: Schema.Types.ObjectId, ref: 'Users'},
        requestStatus: { type: String, default: 'Pending' },
    },
    { timestamps: true }
);

const friendRequest = mongoose.model('friendRequest',requestSchema);

export default friendRequest;