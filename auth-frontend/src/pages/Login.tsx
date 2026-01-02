import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff, Menu, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import backgroundImg from '../assets/background.png';
import logoImg from '../assets/hugeicons_course.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const API_URL = 'http://localhost:3000/auth';

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });

    console.log('Login success:', res.data);

    const userData = {
  uid: res.data.uid,
  email: res.data.email,
  fullName: res.data.fullName ,
  appId: res.data.appId || '',
};

    login(res.data.customToken, userData);

    toast.success(' Login successful! Welcome back!', { theme: 'dark' });

    navigate('/freeTrial', { replace: true });
  } catch (err: any) {
    toast.error(` ${err.response?.data?.message || 'Invalid email or password'}`, { theme: 'dark' });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#ECEFCA]">
      <img
        src={backgroundImg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-4 md:p-8 flex justify-between items-center z-30">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-gray-800 hidden md:block">
            Tic's Course
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <a href="/" className="px-6 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition">
            Sign Up
          </a>
          <a href="/freeTrial" className="px-6 py-2 bg-[#1e3a8a] text-white font-medium rounded-lg hover:bg-[#1e40af] transition">
            Free Trial
          </a>
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-800 z-50"
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 z-50 md:hidden ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="p-8 pt-24 flex flex-col gap-8">
              <div className="flex items-center gap-3 border-b pb-6">
                <img src={logoImg} alt="Logo" className="w-12 h-12" />
                <h2 className="text-2xl font-bold text-gray-800">Tic's Course</h2>
              </div>
              <a href="/" className="py-3 text-left text-gray-700 font-medium hover:bg-gray-100 rounded-lg px-4 transition">
                Sign Up
              </a>
              <a href="/freeTrial" className="py-3 bg-[#1e3a8a] text-white font-medium rounded-lg hover:bg-[#1e40af] transition px-4">
                Free Trial
              </a>
            </div>
          </div>
        </>
      )}

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-lg px-0 mt-10">
        <div className="absolute inset-0 bg-[#0f172a]/30 backdrop-blur-lg rounded-3xl -z-10" />

        <div className="relative bg-[#0f172a]/80 backdrop-blur-md text-white rounded-2xl shadow-2xl p-8 md:p-10 border border-white/10">
          <h2 className="text-4xl text-center mb-2 font-supermercadoOne">
            WELCOME BACK,
          </h2>
          <p className="text-center text-gray-300 mb-8 text-sm leading-relaxed">
            Log in to continue your learning journey with Tic's Course.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm mb-2">
                <Mail size={18} />
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="flex items-center gap-2 text-sm mb-2">
                <Lock size={18} />
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white mt-3"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#3b82f6] hover:bg-[#2563eb] font-semibold rounded-lg transition disabled:opacity-70 shadow-lg"
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="mt-8 text-center text-gray-400 text-sm">
            Don't have an account?
            <br />
            <a href="/" className="text-blue-400 hover:underline font-medium">
              Sign up here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;