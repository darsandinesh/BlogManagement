import express from 'express';
import upload from '../../utils/multer';
import { blogController } from '../controllers/blogController';
import authMiddleware from '../middlewares/auth';

const blogRouter = express.Router();

blogRouter.post('/addBlog', authMiddleware, upload.single('image'), blogController.addBlog);
blogRouter.get('/getBlog', authMiddleware, blogController.getBlog);
blogRouter.get('/getUserBlogs/:id', authMiddleware, blogController.getUserBlog);
blogRouter.get('/getSingleBlog/:blogId', authMiddleware, blogController.getSingleBlog);
blogRouter.put('/editBlog', authMiddleware, upload.single('image'), blogController.editBlog);
blogRouter.delete('/deleteBlog/:blogId',authMiddleware,blogController.deleteBlog)

export default blogRouter;