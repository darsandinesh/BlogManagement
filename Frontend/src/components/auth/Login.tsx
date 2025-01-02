import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgCloseR } from "react-icons/cg";
import axios from 'axios';
import { userEndpoints } from '../../constraints/endpoints/userEndpoints';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slice/UserSlice';

function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [openForgotPassword, setOpenForgotPassword] = useState<boolean>(false);
    const [forgotEmailError, setForgotEmailError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingForgot, setLoadingForgot] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const validateEmail = (email: string) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let valid = true;

        if (!email || !validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password || password.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (valid) {
            try {
                setLoading(true)
                const result = await axios.post(userEndpoints.login, { email, password });
                if (result.status === 200 && result.data.success) {
                    toast.success(result.data.message)
                    dispatch(login(result.data.data));
                    Cookies.set('token', result.data.token.accessToken);
                    Cookies.set('refreshToken', result.data.token.refreshToken)
                    navigate('/home');
                    setLoading(false)
                } else {
                    toast.error(result.data.message)
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignUp = () => {
        navigate('/register');
    };

    const handleForgotPassword = async () => {
        setLoadingForgot(true)
        if (!email || !validateEmail(email)) {
            setLoadingForgot(false)
            setForgotEmailError('Please enter a valid email address.');
        } else {
            try {
                const result = await axios.post(userEndpoints.forgetPassword, { email });
                console.log(result, '-------------res');
                if (result.data.success) {
                    toast.success(result.data.message);
                    setOpenForgotPassword(false);
                    setLoadingForgot(false)
                } else {
                    toast.error(result.data.message)
                    setForgotEmailError('');
                    setLoadingForgot(false)
                }
            } catch (error) {
                console.log('Error while forgetPassword');
                setLoadingForgot(false)
                toast.error('Something went wrong, Please try again');
            }
        }
    };

    return (
        <div className='flex flex-col md:flex-row w-full h-screen'>
            <div className='flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 w-full md:w-1/2'>
                <img className='w-full h-full' src="https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy_335657-2386.jpg?semt=ais_hybrid" alt="" />
            </div>

            <div className='flex items-center justify-center w-full md:w-1/2 p-6'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white rounded-lg shadow-lg p-8'>
                    <h2 className='text-2xl font-bold text-center mb-6'>Login</h2>

                    {/* Email Input */}
                    <div className='flex flex-col w-full gap-2 mb-4'>
                        <label className='text-lg font-medium'>Email Address:</label>
                        <input
                            className={`border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-2 ${emailError ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            type="text"
                            placeholder='Enter your email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <p className='text-red-500 text-sm'>{emailError}</p>}
                    </div>

                    {/* Password Input with Show/Hide Button */}
                    <div className='flex flex-col w-full gap-2 mb-1 relative'>
                        <label className='text-lg font-medium'>Password:</label>
                        <input
                            className={`border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 ${passwordError ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <p className='text-red-500 text-sm'>{passwordError}</p>}

                        <button
                            type='button'
                            className='absolute top-12 right-4 text-gray-600 focus:outline-none'
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <span className='text-lg pt-6'>🐵</span> : <span className='text-lg pt-6'>🙈</span>}
                        </button>
                    </div>

                    <div className='flex mb-4 justify-end'>
                        <span
                            className='cursor-pointer hover:underline hover:text-blue-600'
                            onClick={() => setOpenForgotPassword(true)}
                        >
                            Forgot Password ?
                        </span>
                    </div>

                    {/* Login Button */}
                    <button
                        className={`w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-lg p-3 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? 'Login....' : 'Login'}
                    </button>

                    {/* Sign Up Link */}
                    <div className='mt-4 text-center'>
                        <p>Not a member yet?{' '}
                            <span
                                className='text-blue-600 cursor-pointer hover:underline'
                                onClick={handleSignUp}
                            >
                                Sign up!
                            </span>
                        </p>
                    </div>
                </form>
            </div>

            {
                openForgotPassword &&
                <div className="fixed inset-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-lg p-8 relative">
                        <button
                            onClick={() => setOpenForgotPassword(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition duration-200"
                        >
                            <CgCloseR size={30} />
                        </button>

                        <div className="flex flex-col w-full gap-6 items-center">
                            <h2 className="text-3xl font-bold text-center text-gray-800">Reset Password</h2>

                            {/* Email Input Section */}
                            <div className="w-full">
                                <label className="block text-lg font-medium text-gray-700">Email Address:</label>
                                <input
                                    className={`mt-1 block w-full p-3 border ${forgotEmailError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 ${forgotEmailError ? 'focus:ring-red-500' : 'focus:ring-blue-500'} transition duration-200`}
                                    type="text"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {forgotEmailError && <p className="text-red-500 text-sm mt-2">{forgotEmailError}</p>}
                            </div>

                            {/* Reset Button */}
                            <button
                                className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg p-3 mt-4 hover:bg-gradient-to-r transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ${loadingForgot && 'opacity-50 cursor-not-allowed'}`}
                                type="button"
                                onClick={handleForgotPassword}
                                disabled={loadingForgot}
                            >
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Login;