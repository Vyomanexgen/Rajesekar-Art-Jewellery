import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa';

const AdminLogin = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(''); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check credentials
    if (formData.username === 'Admin' && formData.password === '12345') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid username or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] px-5 py-8">
      <div aria-hidden="true" className="absolute right-[-250px] top-[-250px] h-[500px] w-[500px] rounded-full bg-white/10" />
      <div aria-hidden="true" className="absolute bottom-[-150px] left-[-150px] h-[300px] w-[300px] rounded-full bg-white/10" />
      <div className="relative z-[1] w-full max-w-[450px] rounded-[20px] bg-white/95 px-5 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-[10px] sm:px-[30px] sm:py-10 md:px-10 md:py-[50px]">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] text-[2rem] text-white shadow-[0_10px_25px_rgba(102,126,234,0.4)] sm:h-20 sm:w-20 sm:text-[2.5rem]">
            <FaLock />
          </div>
          <h1 className="mb-2 text-[1.5rem] font-bold text-slate-800 sm:text-[1.75rem] md:text-[2rem]">Admin Login</h1>
          <p className="text-base font-normal text-slate-500">Enter your credentials to access the admin dashboard</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="ml-1 text-[0.9rem] font-semibold text-slate-600">
              Username
            </label>
            <div className="relative flex items-center">
              <FaUser className="pointer-events-none absolute left-[18px] z-[1] text-[1.1rem] text-slate-500" />
              <input
                type="text"
                id="username"
                name="username"
                className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-[18px] py-[12px] pl-[45px] text-base text-slate-800 outline-none transition focus:border-[#667eea] focus:bg-white focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] sm:py-[14px] sm:pl-[50px]"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="ml-1 text-[0.9rem] font-semibold text-slate-600">
              Password
            </label>
            <div className="relative flex items-center">
              <FaLock className="pointer-events-none absolute left-[18px] z-[1] text-[1.1rem] text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-[18px] py-[12px] pl-[45px] text-base text-slate-800 outline-none transition focus:border-[#667eea] focus:bg-white focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] sm:py-[14px] sm:pl-[50px]"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="absolute right-[15px] z-[1] p-[5px] text-[1.2rem] text-slate-500 transition hover:text-[#667eea]"
                onClick={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="mt-2.5 w-full rounded-xl bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] px-4 py-[14px] text-base font-semibold text-white shadow-[0_4px_15px_rgba(102,126,234,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.5)] active:translate-y-0 sm:py-4 sm:text-[1.1rem]">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
