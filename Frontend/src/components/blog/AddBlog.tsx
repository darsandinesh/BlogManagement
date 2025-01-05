import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../constraints/axios/userAxios";
import { blogEndpoints } from "../../constraints/endpoints/blogEndpoints";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/Store";

const AddBlog = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        image: null as File | null,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const userId = useSelector((state: RootState) => state.user.userData?.id)

    const navigate = useNavigate()

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                toast.error("Image size should be less than 10MB.");
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
        if (!formData.image) newErrors.image = "A cover image is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true)
            try {

                const formDataToSubmit = new FormData();
                formDataToSubmit.append("title", formData.title);
                formDataToSubmit.append("category", formData.category);
                formDataToSubmit.append("description", formData.description);
                formDataToSubmit.append("userId", userId || '');

                if (formData.image) {
                    formDataToSubmit.append("image", formData.image);
                }

                const result = await axiosInstance.post(blogEndpoints.addBlog, formDataToSubmit, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (result.data.success) {
                    toast.success(result.data.message);
                    navigate('/home')
                    setLoading(false)
                } else {
                    toast.error(result.data.message)
                    setLoading(false)
                }

            } catch (error) {
                console.log(error);
                toast.error('Something went wrong, Please try again.')
                setLoading(false)
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-4xl bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            >
                <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-6 text-white text-center">
                    <h1 className="text-3xl font-bold">Create New Blog</h1>
                </div>

                <div className="p-8 space-y-8">
                    <div className="flex flex-col lg:flex-row gap-8">
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
                                className={`w-full aspect-video bg-gray-50 border-2 border-dashed rounded-lg cursor-pointer flex items-center justify-center transition duration-200 ${imagePreview ? "border-transparent" : "hover:border-teal-500"
                                    }`}
                            >
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="text-center text-gray-500">
                                        <p className="text-4xl mb-4">📸</p>
                                        <p className="text-lg font-semibold">Upload a Cover Image</p>
                                        <p className="text-sm">PNG, JPG up to 10MB</p>
                                    </div>
                                )}
                            </div>
                            {errors.image && (
                                <p className="text-red-500 text-sm mt-2">{errors.image}</p>
                            )}
                        </div>

                        {/* Form Fields */}
                        <div className="w-full lg:w-1/2 space-y-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Blog Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                    placeholder="Enter blog title"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                >
                                    <option value="">Select a category</option>
                                    <option value="technology">Technology</option>
                                    <option value="lifestyle">Lifestyle</option>
                                    <option value="travel">Travel</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.category && (
                                    <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    rows={5}
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
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
                    <button
                        type="submit"
                        className={`w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Submiting...' : 'Submit Blog'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;
