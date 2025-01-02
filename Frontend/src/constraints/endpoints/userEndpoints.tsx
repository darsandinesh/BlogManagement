
export const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;


export const userEndpoints = {
    register: `${BASE_URL}/auth/register`,
    verifyEmail: `${BASE_URL}/auth/verifyEmail`,
    login: `${BASE_URL}/auth/login`,
    forgetPassword: `${BASE_URL}/auth/forgetPassword`,
    setFortgotPassword:`${BASE_URL}/auth/setFortgotPassword`,
    changeAvatar: `${BASE_URL}/user/editAvatar`,
    updateProfile: `${BASE_URL}/user/updateProfile`,
    resetPassword: `${BASE_URL}/user/resetPassword`
}