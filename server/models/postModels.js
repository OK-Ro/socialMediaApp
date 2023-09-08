import mongoose,{Schema} from "mongoose";

// schema
const postSchema = new mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
        description: { type: String, required: true },
        image: { type: String },
        likes: [{ type: String }],
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
    },
    { timestamps: true }
);

const Posts = mongoose.model('Posts', postSchema);

export default Posts;
