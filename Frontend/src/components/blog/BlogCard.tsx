import { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../constraints/axios/userAxios';
import { blogEndpoints } from '../../constraints/endpoints/blogEndpoints';
import { blogData } from '../../interface/IBlog';
import { toast } from 'react-toastify';


function BlogCard() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [blogs, setBlogs] = useState<blogData[]>([])

    const navigate = useNavigate();

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setIsFilterVisible(false);
    };

    const filteredBlogs = blogs.filter((blog) => {
        const matchesCategory =
            selectedCategory === 'All' || blog.category === selectedCategory;
        const matchesSearchTerm =
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || ''
        blog.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearchTerm;
    });

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const result = await axiosInstance.get(blogEndpoints.getBlog);
                console.log(result, '-----------')
                if (result.data.success) {
                    setBlogs(result.data.data)
                } else {
                    toast.error(result.data.message)
                }
            } catch (error) {
                console.log(error);
                toast.error('An unexpected error occured, try again after some time.')
            }
        }

        fetchBlogs();
    }, [])

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 px-4 md:px-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">
                    Explore Blogs
                </h1>
                <div className="flex w-full md:w-1/2 gap-4 md:gap-10">
                    <input
                        type="text"
                        placeholder="Search Blogs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    />
                    <button
                        onClick={() => setIsFilterVisible(!isFilterVisible)}
                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        <FaFilter className="mr-2" />
                        Filter
                    </button>
                </div>
            </div>

            {isFilterVisible && (
                <div className="flex justify-center mb-6 px-4 md:px-6">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <ul className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4">
                            <li
                                onClick={() => handleCategoryChange('All')}
                                className="cursor-pointer text-gray-800 hover:text-blue-500 transition"
                            >
                                All
                            </li>
                            <li
                                onClick={() => handleCategoryChange('Technology')}
                                className="cursor-pointer text-gray-800 hover:text-blue-500 transition"
                            >
                                Technology
                            </li>
                            <li
                                onClick={() => handleCategoryChange('Lifestyle')}
                                className="cursor-pointer text-gray-800 hover:text-blue-500 transition"
                            >
                                Lifestyle
                            </li>
                            <li
                                onClick={() => handleCategoryChange('Travel')}
                                className="cursor-pointer text-gray-800 hover:text-blue-500 transition"
                            >
                                Travel
                            </li>
                            <li
                                onClick={() => handleCategoryChange('Other')}
                                className="cursor-pointer text-gray-800 hover:text-blue-500 transition"
                            >
                                Other
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6">
                {filteredBlogs.map((blog, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="flex items-center p-4">
                            <img
                                src={blog.userId.avatar || `https://ui-avatars.com/api/?name=${blog.userId.username}`}
                                alt={blog.userId.username}
                                className="w-10 h-10 rounded-full object-cover mr-4"
                            />
                            <span className="text-gray-700 font-medium">{blog.userId.username}</span>
                        </div>

                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-48 object-cover"
                        />

                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2 text-gray-800">Title : {blog.title}</h2>
                            <h6 className='text-lg mb-2 text-gray-600'>Category : {blog.category}</h6>
                            <p className="text-gray-600 text-sm mb-4">Description : {blog.description.split(' ').slice(0, 10).join(' ')}...</p>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
                                onClick={() => {
                                    navigate('/blogDetail', { state: blog });
                                }}
                            >
                                Read More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default BlogCard;
