import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../constraints/axios/userAxios";
import { blogEndpoints } from "../../constraints/endpoints/blogEndpoints";

interface BlogData {
    _id: string;
    title: string;
    category: string;
    description: string;
    image: File | string; 
}

const UpdateBlog = () => {
    const blogId = useLocation();
    const initialData: BlogData = {
        _id: "",
        title: "",
        category: "",
        description: "",
        image: "",
    };

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState<BlogData>(initialData);
    const [originalData, setOriginalData] = useState<BlogData>(initialData);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showNoChangesError, setShowNoChangesError] = useState(false);

    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    
    useEffect(() => {
        const fetchBlog = async () => {
            const result = await axiosInstance.get(`${blogEndpoints.getSingleBlog}/${blogId.state}`);
            setFormData(result.data.data);
            setOriginalData(result.data.data);
            setImagePreview(result.data.data.image);
        };
        fetchBlog();
    }, [blogId]);

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setErrors({ ...errors, image: "Image size should be less than 10MB." });
                return;
            }
            const fileExtension = file.type.split("/")[1];
            if (!["png", "jpg", "jpeg", "webp"].includes(fileExtension.toLowerCase())) {
                setErrors({ ...errors, image: "Only PNG, JPG, and WEBP formats are allowed." });
                return;
            }            
            setFormData({ ...formData, image: file });
            setErrors({ ...errors, image: "" });
            setImagePreview(URL.createObjectURL(file)); 
        }
    };

    const triggerFileInput = () => {
        document.getElementById("fileInput")?.click();
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.title) newErrors.title = "Title is required.";
        if (!formData.category) newErrors.category = "Category is required.";
        if (!formData.description || formData.description.length < 10)
            newErrors.description = "Description must be at least 10 characters long.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isFormModified = () => {
        const { title, category, description, image } = formData;

        const isTextModified =
            title !== originalData.title ||
            category !== originalData.category ||
            description !== originalData.description;

        const isImageModified =
            typeof image === "string" ? image !== originalData.image : image instanceof File;

        return isTextModified || isImageModified;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (validate()) {
            if (isFormModified()) {
                const formDataToSend = new FormData();
                formDataToSend.append("id", formData._id);
                formDataToSend.append("title", formData.title);
                formDataToSend.append("category", formData.category);
                formDataToSend.append("description", formData.description);
                if (formData.image instanceof File) {
                    formDataToSend.append("image", formData.image);
                }

                try {
                    const result = await axiosInstance.put(blogEndpoints.editBlog, formDataToSend, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                    console.log("Result for updation", result);
                    if (result.data.success) {
                        toast.success(result.data.message);
                        navigate('/profile')
                        setLoading(false);
                    } else {
                        setLoading(false);
                        toast.error(result.data.message);
                    }
                } catch (error) {
                    setLoading(false);
                    toast.error("Failed to update blog. Please try again.");
                }
                setShowNoChangesError(false);
            } else {
                toast.error("No changes were made.");
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="bg-gradient-to-b flex items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-4xl bg-white rounded-lg shadow-lg"
                >
                    <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-6 text-white text-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-white">Edit Blog</h1>
                    </div>

                    <div className="p-6 space-y-6">
                        {showNoChangesError && (
                            <p className="text-red-500 text-center">No changes made to the blog.</p>
                        )}
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Image Upload Section */}
                            <div className="w-full lg:w-1/2">
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <div
                                    onClick={triggerFileInput}
                                    className={`w-full aspect-video rounded-lg border-2 border-dashed cursor-pointer flex items-center justify-center ${imagePreview
                                        ? "border-transparent"
                                        : "border-violet-300 hover:border-blue-500"
                                        }`}
                                >
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="text-center p-4 md:p-6">
                                            <div className="text-3xl md:text-4xl mb-2">📸</div>
                                            <p className="text-gray-500 text-sm md:text-base">
                                                Click to change cover image
                                            </p>
                                            <p className="text-xs md:text-sm text-gray-400">
                                                PNG, JPG up to 10MB
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {errors.image && (
                                    <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                                )}
                            </div>

                            {/* Form Fields */}
                            <div className="w-full lg:w-1/2 space-y-4">
                                <div>
                                    <label className="block text-blue-700 font-medium mb-2">
                                        Blog Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter blog title"
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-blue-700 font-medium mb-2">
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">{formData.category}</option>
                                        <option value="technology">Technology</option>
                                        <option value="lifestyle">Lifestyle</option>
                                        <option value="travel">Travel</option>
                                        <option value="travel">Other</option>
                                    </select>
                                    {errors.category && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.category}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-blue-700 font-medium mb-2">
                                        Blog Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={6}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter blog description"
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-gray-100 text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
                        >
                            {loading ? "Updating..." : "Update Blog"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateBlog;
