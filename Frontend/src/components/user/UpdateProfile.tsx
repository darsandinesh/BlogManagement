import { useState } from 'react';
import { Camera } from 'lucide-react';
import axiosInstance from '../../constraints/axios/userAxios';
import { userEndpoints } from '../../constraints/endpoints/userEndpoints';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/Store';
import { updateAvatar, updateProfile } from '../../redux/slice/UserSlice';
import { toast } from 'react-toastify';
import { UserDetails } from '../../interface/IUser';



interface CloseModal {
    showModal: boolean;
    closeModal: (value: boolean) => void;
}

function UpdateProfile({ showModal, closeModal }: CloseModal) {

    const userData = useSelector((state: RootState) => state.user.userData)
    const dispatch = useDispatch()
    const [userDetails, setUserDetails] = useState<UserDetails>({
        name: userData?.name || '',
        email: userData?.email || '',
        phone: userData?.phone || '',
        bio: userData?.bio || '',
    });

    const [tempDetails, setTempDetails] = useState<UserDetails>({ ...userDetails });
    const [profileImage, setProfileImage] = useState<string | null>(userData?.avatar || null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const isDetailsChanged = () => {
        return JSON.stringify(userDetails) !== JSON.stringify(tempDetails);
    };

    const handleImageUpload = async (event: any) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const response = await axiosInstance.put(userEndpoints.changeAvatar, { image: file, id: userData?.id },
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
                if (response.data.success) {
                    setProfileImage(response.data.imageURL)
                    dispatch(updateAvatar(response.data.imageURL));
                    closeModal(true);
                } else {
                    setErrors({ avatar: response.data.message });
                }
            } catch (error) {
                setErrors({ avatar: 'Failed to upload image. Please try again.' });
            }
        }
    };

    const handleSave = async () => {
        setErrors({});

        if (!tempDetails.name || !tempDetails.phone) {
            setErrors((prev) => ({ ...prev, general: 'Please fill in all required fields.' }));
            return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(tempDetails.phone)) {
            setErrors((prev) => ({ ...prev, phone: 'Please enter a valid phone number.' }));
            return;
        }

        if (isDetailsChanged()) {
            try {
                const result = await axiosInstance.put(userEndpoints.updateProfile, tempDetails);
                console.log(result.data, '------------msg');
                if (result.data.success) {
                    dispatch(updateProfile(tempDetails))
                    setUserDetails(tempDetails);
                    toast.success(result.data.message)
                    closeModal(false);
                } else {
                    toast.error(result.data.message)
                }
            } catch (error) {
                toast.error('Something went worng. Please try again')
            }
        } else {
            toast.info('No changes detected.')
        }
    };

    const handleCancel = () => {
        setTempDetails({ ...userDetails });
        closeModal(false);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setTempDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-opacity-50 bg-gray-800 p-6 rounded-lg shadow-lg w-full z-50">
                    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">Edit Profile</h2>

                        <div className="flex flex-col items-center gap-4">
                            {/* Profile Image Section */}
                            <div className="relative">
                                <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shadow-lg mb-3">
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Camera className="w-16 h-16 text-gray-400" />
                                    )}
                                </div>
                                <label
                                    htmlFor="profile-upload"
                                    className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
                                >
                                    <Camera className="w-5 h-5 text-white" />
                                </label>
                                <input
                                    id="profile-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                {errors.avatar && <p className="text-red-500 text-sm mt-2">{errors.avatar}</p>}
                            </div>

                            {/* User Details Section */}
                            <div className="flex flex-col gap-4 w-full">
                                {/* Name Input */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={tempDetails.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                                </div>

                                {/* Email Input */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        disabled
                                        value={tempDetails.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                                </div>

                                {/* Phone Input */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={tempDetails.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
                                </div>

                                {/* Bio Input */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={tempDetails.bio}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Tell us something about yourself..."
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-between mt-6">
                                    <button
                                        onClick={handleCancel}
                                        className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                            {errors.general && <p className="text-red-500 text-sm mt-4">{errors.general}</p>}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UpdateProfile;