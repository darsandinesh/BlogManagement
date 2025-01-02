import React from 'react'
import Navbar from '../components/user/Navbar'
import UpdateBlog from '../components/blog/UpdateBlog'

function EditBlogPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
            <Navbar />
            <div className="container mx-auto py-12 px-6 ">
                <UpdateBlog />
            </div>
        </div>
    )
}

export default EditBlogPage
