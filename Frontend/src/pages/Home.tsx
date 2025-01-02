import BlogCard from '../components/blog/BlogCard'
import Navbar from '../components/user/Navbar'

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
            <Navbar />
            <div className="container mx-auto py-12 px-6">
                <BlogCard />
            </div>
        </div>
    )
}

export default Home
