import { Request, Response } from "express";
import { BlogService } from '../../app/useCases/blog';

class BlogController {
    private blogService: BlogService;

    constructor() {
        this.blogService = new BlogService();
    }

    addBlog = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const file = req.file;
            const result = await this.blogService.addBlog(data, file)
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message })
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.error('Error in addBlog:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }

    editBlog = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const file = req.file;
            const result = await this.blogService.editBlog(data, file);
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message })
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.error('Error in editBlog:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }

    getBlog = async (req: Request, res: Response) => {
        try {
            const result = await this.blogService.getBlog()
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message, data: result.blogData })
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.error('Error in getBlog:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }

    getUserBlog = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id
            const result = await this.blogService.getUserBlog(userId)
            console.log(result);
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message, data: result.blogData })
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.error('Error in getUserBlog:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }

    getSingleBlog = async (req: Request, res: Response) => {
        try {
            console.log(req.params.blogId, '-------------------blog id in backend')
            const blogId = req.params.blogId
            const result = await this.blogService.getSingleBlog(blogId);
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message, data: result.blogData })
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.error('Error in getSingleBlog:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }

    deleteBlog = async (req: Request, res: Response) => {
        try {
            const blogId = req.params.blogId;
            const result = await this.blogService.deleteBlog(blogId);
            if (result.success) {
                res.status(200).json({ success: result.success, message: result.message, data: result.blogData })
            } else {
                res.json({ success: result.success, message: result.message })
            }
        } catch (error) {
            console.error('Error in deleteBlog:', error);
            res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
        }
    }

}

export const blogController = new BlogController();