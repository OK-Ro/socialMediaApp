import mongoose from "mongoose";

const { Schema } = mongoose;

const commentsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    postId: { type: Schema.Types.ObjectId, ref: 'Posts' },
    comment: { type: String, required: true },
    from: { type: String, required: true }, 
    replies: [
        {
            rid: { type: Schema.Types.ObjectId },
            userId: { type: Schema.Types.ObjectId, ref: 'Users' },
            from: { type: String },
            replyAt: { type: String },
            comment: { type: String },
            created_At: { type: Date, default: Date.now() },
            updated_At: { type: Date, default: Date.now() },
            likes: [{ type: String }]
        }
    ],
    likes: [{ type: String }]
},
{timestamps: true}
);

// Export the schema
const Comments =  mongoose.model('Comment', commentsSchema);
export default Comments
