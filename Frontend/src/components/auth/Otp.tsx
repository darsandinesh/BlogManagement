import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OTP() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [otpError, setOtpError] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(60); 
  const [resendEnabled, setResendEnabled] = useState<boolean>(false);

  const inputRefs = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendEnabled(true);
    }
  }, [timeLeft]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const validateOtp = (otp: string[]) => {
    return otp.join('').length === 6; 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateOtp(otp)) {
      setOtpError('');
      console.log('OTP is valid!', otp.join(''));
      navigate('/');
    } else {
      setOtpError('Please enter a valid 6-digit OTP.');
    }
  };

  const handleResendOtp = () => {
    if (resendEnabled) {
      console.log('OTP Resent!');
      setTimeLeft(60);
      setResendEnabled(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="flex items-center justify-center w-full md:w-1/2 p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Enter OTP</h2>

          <div className="flex justify-between w-full mb-5">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el!)}
                className={`border ${otpError ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-center text-xl w-12 h-12 focus:outline-none focus:ring-2 ${otpError ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          {otpError && <p className="text-red-500 text-sm">{otpError}</p>}

          {/* Submit Button */}
          <button
            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-lg p-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 transition duration-300"
            type="submit"
          >
            Verify OTP
          </button>

          <div className="mt-4 text-center">
            {timeLeft > 0 ? (
              <p className="text-sm">You can resend OTP in <span className='text-red-600'>{timeLeft} seconds</span>.</p>
            ) : (
              <p className="text-sm">
                Didn't receive the OTP?{' '}
                <span
                  className={`cursor-pointer ${resendEnabled ? 'text-blue-600 hover:underline' : 'text-gray-400'}`}
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </span>
              </p>
            )}
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center bg-gradient-to-br from-purple-400 to-blue-600 w-full md:w-1/2 p-6">
        <h1 className="text-4xl font-bold text-white p-2 text-center">
          Secure Your Account
        </h1>
      </div>
    </div>
  );
}

export default OTP;
