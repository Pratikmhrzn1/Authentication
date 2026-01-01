import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff, Menu, X } from 'lucide-react';
import { toast } from 'react-toastify';

import backgroundImg from '../assets/background.png';
import logoImg from '../assets/hugeicons_course.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const API_URL = 'http://localhost:3000/auth';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });

      // Success toast
      toast.success('🎉 Login successful! Welcome back!', {
        position: 'top-right',
        autoClose: 6000,
        theme: 'dark',
      });

      console.log('Login response:', res.data);

      // Store tokens if needed (e.g., localStorage)
      if (res.data.idToken) {
        localStorage.setItem('idToken', res.data.idToken);
        localStorage.setItem('uid', res.data.uid);
      }

      // Reset form
      setPassword('');
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Invalid email or password';
      toast.error(`❌ ${errorMsg}`, {
        position: 'top-right',
        autoClose: 10000,
        theme: 'dark',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loginFields = [
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      value: email,
      setValue: setEmail,
      icon: Mail,
    },
    {
      id: 'password',
      label: 'Password',
      type: showPassword ? 'text' : 'password',
      placeholder: 'Enter your password',
      value: password,
      setValue: setPassword,
      icon: Lock,
      hasToggle: true,
    },
  ];

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
          <h1 className="text-2xl font-bold text-gray-800 hidden md:block">Tic's Course</h1>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <button className="px-6 py-2 text-white font-medium bg-[#5C7C94] hover:bg-blue-800 rounded-lg transition">
            Sign Up
          </button>
          <button className="px-6 py-2 border border-[#5C7C94] text-[#24384B] font-medium rounded-lg hover:bg-[#1e40af] hover:text-white transition">
            Free Trial
          </button>
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
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
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
              <button className="py-3 text-left text-gray-700 font-medium hover:bg-gray-100 rounded-lg px-4 transition">
                Sign Up
              </button>
              <button className="py-3 bg-[#1e3a8a] text-white font-medium rounded-lg hover:bg-[#1e40af] transition px-4">
                Free Trial
              </button>
            </div>
          </div>
        </>
      )}

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-lg px-4 mt-10">
        <div className="absolute inset-0 bg-[#0f172a]/30 backdrop-blur-lg rounded-3xl -z-10" />

        <div className="relative bg-[#0f172a]/80 backdrop-blur-md text-white rounded-2xl shadow-2xl p-8 md:p-10 border border-white/10">
          <h2 className="text-3xl md:text-4xl text-center mb-2 font-supermercadoOne">WELCOME BACK,</h2>
          <p className="text-center text-gray-300 mb-8 text-sm leading-relaxed">
            Log in to continue building your skills with Tic's Course.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginFields.map((field) => (
              <div key={field.id}>
                <label className="flex items-center gap-2 text-sm mb-2">
                  <field.icon size={18} />
                  {field.label}
                </label>
                <div className={field.hasToggle ? 'relative' : ''}>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    required
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 ${
                      field.hasToggle ? 'pr-12' : ''
                    }`}
                  />
                  {field.hasToggle && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-11 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="keepLogin"
                  className="w-5 h-5 accent-blue-500 rounded"
                />
                <label htmlFor="keepLogin" className="cursor-pointer">
                  Keep me signed in
                </label>
              </div>
              <a href="#" className="text-blue-400 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#547792] hover:bg-[#B026FF] font-semibold rounded-lg transition disabled:opacity-70 shadow-lg mt-4"
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="my-8 text-center text-gray-400 text-sm">
            Don't have an account?
            <br />
            <a href="/signup" className="text-blue-400 hover:underline font-medium">
              Sign up here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;