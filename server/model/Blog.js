import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        likeCount: {
            type: Number,
            default: 0, // Default like count is 0
        },
    },
    { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
