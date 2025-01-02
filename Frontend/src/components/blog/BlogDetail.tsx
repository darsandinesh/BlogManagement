import { useState, useEffect } from "react";
import { blogData } from "../../interface/IBlog";
import { useLocation } from "react-router-dom";

function BlogDetail() {
    const [blogs, setBlogs] = useState<blogData | null>(null);
    const { state } = useLocation();
    console.log(state, '----------data in the detail page');

    useEffect(() => {
        if (state) {
            setBlogs(state);
        }
    }, [state]);

    return (
        <div className=" bg-gray-100 p-6 flex justify-center items-center"> {/* Center content */}
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg flex flex-col md:flex-row p-8 md:p-10 space-y-6 md:space-y-0"> {/* Added more padding and space */}

                <div className="w-full md:w-1/2 lg:w-1/2 mb-6 md:mb-0 flex justify-center">
                    <img
                        src={blogs?.image || "https://via.placeholder.com/400"}
                        alt={blogs?.title || "Blog"}
                        className="w-full min-h-96 object-fit rounded-lg md:max-h-[450px]"
                    />
                </div>

                <div className="w-full md:w-2/3 md:pl-10 flex flex-col justify-center">

                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-10 text-center md:text-left">
                        {blogs?.title || "Blog Title"}
                    </h1>
                    <div className="flex flex-col md:flex-row justify-between text-sm text-gray-500 mb-6">
                        <div className="flex items-center space-x-3">
                            <img
                                src={blogs?.userId?.avatar || `https://ui-avatars.com/api/?name=${blogs?.userId?.username || blogs?.username}`}
                                alt="Profile"
                                className="w-8 h-8 object-cover rounded-full"
                            />
                            <span className="text-center md:text-left">
                                By: {blogs?.userId?.username || blogs?.username || "Unknown Author"}
                            </span>
                        </div>
                        <span className="text-center md:text-right">
                            Published: {blogs?.createdAt ? new Date(blogs.createdAt).toLocaleDateString() : "Unknown Date"}
                        </span>
                    </div>

                    <div className="text-gray-700 text-center md:text-left">
                        <p className="leading-relaxed">
                            {blogs?.description || "Blog description goes here..."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;
