import { useState } from 'react';
import { PasswordData } from '../../interface/IUser';
import { toast } from 'react-toastify';
import axiosInstance from '../../constraints/axios/userAxios';
import { userEndpoints } from '../../constraints/endpoints/userEndpoints';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/Store';

interface PasswordResetModalProps {
    showModal: boolean;
    closeModal: () => void;
}

function PasswordReset({ showModal, closeModal }: PasswordResetModalProps) {

    const [passwordData, setPasswordData] = useState<PasswordData>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [passwordError, setPasswordError] = useState<string>('');
    const [passwordErrors, setPasswordErrors] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const userId = useSelector((state: RootState) => state.user.userData?.email)

    const handleChange = (e: any): void => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    const validatePassword = (): boolean => {
        const { newPassword, confirmPassword } = passwordData;
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            setPasswordError(
                'Password must contain at least one special character, one number, one uppercase letter, one lowercase letter, and be at least 8 characters long.'
            );
            return false;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('New password and confirmation password must match.');
            return false;
        }

        setPasswordError('');
        setLoading(true)
        return true
    };

    const handleSubmitPasswordReset = async () => {
        if (validatePassword()) {
            try {
                const result = await axiosInstance.put(`${userEndpoints.resetPassword}/${userId}`, passwordData)
                console.log(result)
                if (result.data.success) {
                    toast.success(result.data.message)
                    setLoading(false);
                    setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                    })
                    closeModal();
                } else {
                    setLoading(false)
                    setPasswordErrors(result.data.message);
                }
            } catch (error) {
                setLoading(false)
                console.log('Error in the reset password', error);
                toast.error('Something went wrong, Please try again.')
            }

        }
    };


    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reset Password</h2>

                        {/* Password Reset Form */}
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md mt-2"
                                    placeholder="Enter current password"
                                />
                            </div>
                            {passwordErrors && (
                                <p className="text-red-500 text-sm mb-4">{passwordErrors}</p>
                            )}

                            <div className="mb-4">
                                <label className="block text-gray-700">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md mt-2"
                                    placeholder="Enter new password"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md mt-2"
                                    placeholder="Confirm new password"
                                />
                            </div>

                            {/* Validation Error Message */}
                            {passwordError && (
                                <p className="text-red-500 text-sm mb-4">{passwordError}</p>
                            )}

                            <div className="flex justify-between">
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmitPasswordReset}
                                    className={`bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 ${loading && 'opacity-50 cursor-not-allowed'} `}
                                    disabled={loading}
                                >
                                    Reset Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PasswordReset
