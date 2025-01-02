export const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/blog`;


export const blogEndpoints = {
    addBlog: `${BASE_URL}/addBlog`,
    getBlog: `${BASE_URL}/getBlog`,
    getUserBlog: `${BASE_URL}/getUserBlogs`,
    getSingleBlog: `${BASE_URL}/getSingleBlog`,
    editBlog: `${BASE_URL}/editBlog`,
    deleteBlog:`${BASE_URL}/deleteBlog`
}