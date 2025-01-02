import { AddBlog } from "../../domain/entities/IBlog";
import { BlogRepository } from "../../domain/repositories/blogRepository";
import uploadImage from "../../utils/upload";



export class BlogService {
    private blogRepo: BlogRepository

    constructor() {
        this.blogRepo = new BlogRepository();
    }

    async addBlog(data: AddBlog, file: Express.Multer.File | undefined) {
        try {
            const imageUpload = await uploadImage(file);
            if (imageUpload) {
                const result = await this.blogRepo.addBlog(imageUpload, data);
                if (result) {
                    return { success: true, message: 'Blog successfully created.' };
                } else {
                    return { success: false, message: 'Blog creation failed. Please try again later.' };
                }
            } else {
                return { success: false, message: 'Image upload failed. Please try again later.' };
            }
        } catch (error) {
            console.error('Error in addBlog:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    async editBlog(data: AddBlog, file: Express.Multer.File | undefined) {
        try {
            let imageUpload = null;
            if (file) {
                imageUpload = await uploadImage(file);
            }
            const result = await this.blogRepo.editBlog(data, imageUpload);
            if (result.success) {
                return { success: true, message: 'Blog successfully edited.' };
            } else {
                return { success: false, message: 'Blog edit failed. Please try again later.' };
            }
        } catch (error) {
            console.error('Error in editBlog:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    async getBlog() {
        try {
            const result = await this.blogRepo.getBlog()
            if (result) {
                return { success: true, message: 'Blog details fetched successful', blogData: result }
            }
            return { success: false, message: 'Failed to fect Blog data.' };
        } catch (error) {
            console.error('Error in getBlog:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    async getUserBlog(userId: string) {
        try {
            const result = await this.blogRepo.getUserBlog(userId);
            if (result) {
                return { success: true, message: 'Blog details fetched successful', blogData: result }
            }
            return { success: false, message: 'Failed to fect user Blog data.' };
        } catch (error) {
            console.error('Error in getUserBlog:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    async getSingleBlog(blogId: string) {
        try {
            const result = await this.blogRepo.getSingleBlog(blogId);
            if (result) {
                return { success: true, message: 'Blog details fetched successful', blogData: result }
            }
            return { success: false, message: 'Failed to fect user Blog data.' };
        } catch (error) {
            console.error('Error in getUserBlog:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    async deleteBlog(blogId: string) {
        try {
            const result = await this.blogRepo.deleteBlog(blogId);
            if (result.acknowledged) {
                return { success: true, message: 'Blog deleted successful', blogData: result }
            }
            return { success: false, message: 'Failed to delete user Blog.' };
        } catch (error) {
            console.error('Error in deleteBlog:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

}