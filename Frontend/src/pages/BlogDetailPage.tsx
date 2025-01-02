import Navbar from '../components/user/Navbar'
import BlogDetail from '../components/blog/BlogDetail'

function BlogDetailPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
            <Navbar />
            <div className="container mx-auto py-12 px-6 ">
                <BlogDetail />
            </div>
        </div>
    )
}

export default BlogDetailPage
