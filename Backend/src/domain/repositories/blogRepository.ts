import Blog from "../../models/blogModel";
import { AddBlog } from "../entities/IBlog";

export class BlogRepository {
    async addBlog(image: string, data: AddBlog) {
        try {
            const createBlog = new Blog({
                title: data.title,
                description: data.description,
                category: data.category,
                image: image,
                userId: data.userId
            })

            const blogData = await createBlog.save()
            return blogData
        } catch (error) {
            console.error('Error adding blog:', error);
            throw new Error('An error occurred while adding blog. Please try again later.');
        }
    }

    async editBlog(data: AddBlog, image: string | null) {
        try {
            const updateFields: AddBlog = {
                title: data.title,
                category: data.category,
                description: data.description,
            };

            if (image) {
                updateFields.image = image;
            }

            const result = await Blog.updateOne({ _id: data.id }, { $set: updateFields });

            if (result.modifiedCount === 1) {
                return { success: true };
            } else {
                return { success: false, message: "No changes were made." };
            }
        } catch (error) {
            console.error('Error editing blog:', error);
            throw new Error('An error occurred while editing the blog. Please try again later.');
        }
    }


    async getBlog() {
        try {
            const blogs = await Blog.find().populate('userId', 'username avatar').sort({ _id: -1 });
            return blogs
        } catch (error) {
            console.error('Error fetching blogs:', error);
            throw new Error('An error occurred while fetching blogs. Please try again later.');
        }
    }

    async getUserBlog(userId: string) {
        try {
            const userBlog = await Blog.find({ userId: userId });
            return userBlog
        } catch (error) {
            console.error('Error fetching user blogs:', error);
            throw new Error('An error occurred while fetching user blogs. Please try again later.');
        }
    }

    async getSingleBlog(blogId: string) {
        try {
            const blogData = await Blog.findOne({ _id: blogId });
            return blogData
        } catch (error) {
            console.error('Error fetching user blogs:', error);
            throw new Error('An error occurred while fetching user blogs. Please try again later.');
        }
    }

    async deleteBlog(blogId: string) {
        try {
            const deleteBlog = await Blog.deleteOne({ _id: blogId });
            return deleteBlog
        } catch (error) {
            console.error('Error fetching deleteBlog:', error);
            throw new Error('An error occurred while fetching user blogs. Please try again later.');
        }
    }
}