import mongoose, { Schema, Document } from 'mongoose';

interface IBlog extends Document {
    title: string;
    category: string;
    description: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const blogSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        userId: {
            type: String,
            ref: 'User',
            required: true
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            minlength: 10,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


const Blog = mongoose.model<IBlog>('Blog', blogSchema);
export default Blog;
