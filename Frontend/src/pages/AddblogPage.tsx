import Navbar from '../components/user/Navbar'
import AddBlog from '../components/blog/AddBlog'

function AddblogPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
            <Navbar />
            <div className="container mx-auto">
                <AddBlog />
            </div>
        </div>
    )
}

export default AddblogPage
