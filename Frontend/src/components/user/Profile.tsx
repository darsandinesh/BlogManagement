import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UpdateProfile from './UpdateProfile';
import PasswordReset from './PasswordReset';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/Store';
import axiosInstance from '../../constraints/axios/userAxios';
import { blogEndpoints } from '../../constraints/endpoints/blogEndpoints';
import { toast } from 'react-toastify';

interface BlogData {
    _id: string;
    title: string;
    username?: string;
}

function Profile() {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [blogs, setBlogs] = useState<BlogData[]>([]);

    // Blog deletion
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

    const handleDeleteClick = (blogId: string) => {
        setBlogToDelete(blogId);
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = () => {
        if (blogToDelete) {
            handleDeleteBlog(blogToDelete);
        }
        setShowDeleteConfirmation(false);
        setBlogToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
        setBlogToDelete(null);
    };

    const userData = useSelector((state: RootState) => state.user.userData);

    useEffect(() => {
        setLoading(true);
        const fetchUserBlog = async () => {
            try {
                const userId = userData?.id;
                const result = await axiosInstance.get(`${blogEndpoints.getUserBlog}/${userId}`);
                if (result.data.success) {
                    setBlogs(result.data.data);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                console.error('Error fetching user blog:', error);
                toast.error('Something went wrong, try again after some time.');
            }
        };

        fetchUserBlog();
    }, [userData]);

    const handleBlogClick = (blogId: number): void => {
        const blog = blogs[blogId];
        blog.username = userData?.name || '';
        navigate('/blogDetail', { state: blog });
    };

    const handleEditBlog = (index: number) => {
        const blog = blogs[index];
        navigate('/editBlog', { state: blog._id });
    };

    const handleResetPassword = (): void => {
        setShowModal(true);
    };

    const handleCloseModal = (): void => {
        setShowModal(false);
    };

    const handleDeleteBlog = async (blogId: string) => {
        try {
            const result = await axiosInstance.delete(`${blogEndpoints.deleteBlog}/${blogId}`);
            if (result.data.success) {
                setBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== blogId));
                toast.success('Blog deleted successfully');
            } else {
                toast.error('Failed to delete the blog');
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            toast.error('An error occurred while deleting the blog');
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
                        {/* Left Side - Profile Image */}
                        <div className="w-full md:w-1/3">
                            <img
                                src={userData?.avatar || `https://ui-avatars.com/api/?name=${userData?.name}`}
                                alt="Profile"
                                className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full mx-auto"
                            />
                        </div>

                        {/* Profile Details */}
                        <div className="w-full md:w-2/3">
                            <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center md:text-left">{userData?.name}</h1>
                            {/* <p className="text-gray-700 text-sm mb-4 text-center md:text-left">Joined At : 12/12/2024</p> */}

                            {/* Bio Section */}
                            <div className="mb-8 text-center md:text-left">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">About Me</h2>
                                <p className="text-gray-700">
                                    {userData?.bio || 'No Bio available'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info and Reset Password Section */}
                    <div className="flex flex-col md:flex-row gap-6 bg-gray-50 p-6 rounded-lg mt-8 justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 text-center md:text-left">Contact Info:</h2>
                            <p className="text-gray-700 mt-2 text-center md:text-left">
                                <strong>Email:</strong> {userData?.email}
                            </p>
                            <p className="text-gray-700 mt-2 text-center md:text-left">
                                <strong>Phone:</strong> {userData?.phone}
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center">
                            <button
                                onClick={handleResetPassword}
                                className="bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition duration-200 w-full md:w-auto"
                            >
                                Reset Password
                            </button>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 w-full md:w-auto"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* User's Blogs Section */}
                <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg mt-8 p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">My Blogs</h2>
                    <div className="space-y-4">
                        {loading ? (
                            [1, 2, 3, 4, 5].map((_, i) => (
                                <div key={i} className="flex flex-col md:flex-row justify-between items-center bg-gray-200 p-3 rounded-lg animate-pulse">
                                    <div className="w-2/3">
                                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                                        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                                    </div>
                                    <div className="w-1/3 flex justify-end space-x-10 mt-4 md:mt-0">
                                        <div className="h-10 w-20 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <>
                                {
                                    blogs.length === 0 ?
                                        <p>No blogs to show.</p>
                                        :
                                        blogs.map((blog, i) => (
                                            <div
                                                key={blog._id}
                                                className="flex flex-col md:flex-row justify-between items-center bg-white shadow-lg p-3 rounded-lg"
                                            >
                                                <div className="text-center md:text-left">
                                                    <span className="text-xl text-black pr-3">{i + 1}.</span>
                                                    <span
                                                        onClick={() => handleBlogClick(i)}
                                                        className="text-xl text-gray-600 hover:underline hover:text-blue-600 cursor-pointer"
                                                    >
                                                        {blog.title}
                                                    </span>
                                                </div>
                                                <div className="flex justify-center space-x-10 mt-4 md:mt-0">
                                                    <button
                                                        onClick={() => handleEditBlog(i)}
                                                        className="text-lg text-white border p-2 px-5 bg-green-600 rounded-md hover:bg-green-700 transition duration-200"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(blog._id)}
                                                        className="text-lg text-white border p-2 px-5 bg-red-600 rounded-md hover:bg-red-700 transition duration-200"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                }
                            </>
                        )}
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirmation && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg shadow-xl transform transition-all scale-95 hover:scale-100 duration-300 ease-in-out">
                            <h3 className="text-2xl text-gray-800 font-semibold mb-6 text-center">Are you sure you want to delete this blog?</h3>
                            <div className="flex justify-between space-x-4">
                                <button
                                    onClick={handleCancelDelete}
                                    className="bg-gray-400 text-white p-3 px-8 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    className="bg-red-600 text-white p-3 px-8 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>

                )}
            </div>

            {/* Password Reset Modal */}
            <PasswordReset showModal={showModal} closeModal={handleCloseModal} />

            {/* Edit Profile Modal */}
            <UpdateProfile showModal={isEditing} closeModal={setIsEditing} />
        </>
    );
}

export default Profile;
