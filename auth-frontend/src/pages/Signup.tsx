import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, User, Phone, Eye, EyeOff, Menu, X } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ← UNCOMMENTED

import backgroundImg from "../assets/background.png";
import logoImg from '../assets/hugeicons_course.png';

function SignUp() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // ← Now available

  const API_URL = 'http://localhost:3000/auth';

  const formFields = [
    {
      id: 'fullName',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      value: fullName,
      setValue: setFullName,
      icon: User,
      required: true,
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      value: email,
      setValue: setEmail,
      icon: Mail,
      required: true,
    },
    {
      id: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Enter your phone number',
      value: phoneNumber,
      setValue: setPhoneNumber,
      icon: Phone,
      required: true,
    },
    {
      id: 'password',
      label: 'Password',
      type: showPassword ? 'text' : 'password',
      placeholder: 'Enter your password',
      value: password,
      setValue: setPassword,
      icon: Lock,
      required: true,
      minLength: 6,
      hasToggle: true,
    },
  ];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        fullName,
        phoneNumber,
      });

      toast.success(
        <div>
          <strong> Signup Successful!</strong>
          <p className="text-sm mt-1">Welcome to Tic's Course, {fullName || email}!</p>
        </div>,
        {
          position: 'top-right',
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
        }
      );

      console.log('Signup response:', res.data);

      
      const userData = {
        uid: res.data.uid,
        email: res.data.email,
        fullName: fullName,
        appId: res.data.appId || '',
        phoneNumber: phoneNumber,
      };

      login(res.data.customToken || res.data.idToken, userData);

      
      if (keepSignedIn) {
        navigate('/Freetrial', { replace: true });
      }

      // Reset form
      setEmail('');
      setFullName('');
      setPhoneNumber('');
      setPassword('');
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Signup failed. Please try again.';
      toast.error(
        <div>
          <strong> Signup Failed</strong>
          <p className="text-sm mt-1">{errorMsg}</p>
        </div>,
        {
          position: 'top-right',
          autoClose: 10000,//10sec
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#ECEFCA]">
      <img
        src={backgroundImg}
        alt="Background with doodles and characters"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-4 md:p-8 flex justify-between items-center z-30">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="Tic's Course Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-gray-800 hidden md:block">
            Tic's Course
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <a href="/login" className="px-8 py-2 text-white font-medium bg-[#5C7C94] hover:bg-blue-800 rounded-lg transition">
            Log In
          </a>
          <a href="/Freetrial" className="px-6 py-2 border border-[#5C7C94] text-[#24384B] font-medium rounded-lg hover:bg-[#1e40af] transition">
            Free Trial
          </a>
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-800 z-50"
          aria-label="Toggle menu"
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
            className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="p-8 pt-24 flex flex-col gap-8">
              <div className="flex items-center gap-3 border-b pb-6">
                <img src={logoImg} alt="Logo" className="w-12 h-12" />
                <h2 className="text-2xl font-bold text-gray-800">Tic's Course</h2>
              </div>
              <button className="py-3 text-left text-gray-700 font-medium hover:bg-gray-100 rounded-lg px-4 transition">
                Log In
              </button>
              <button className="py-3 bg-[#1e3a8a] text-white font-medium rounded-lg hover:bg-[#948608] transition px-4">
                Free Trial
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main Signup Card */}
      <div className="relative z-10 w-full max-w-lg px-0 mt-10">
        <div className="absolute inset-0 bg-[#0f172a]/30 backdrop-blur-lg rounded-3xl -z-10" />

        <div className="relative bg-[#0f172a]/80 backdrop-blur-md text-white rounded-2xl shadow-2xl p-8 md:p-10 border border-white/10">
          <h2 className="text-3xl md:text-4xl text-center mb-2 font-supermercadoOne">WELCOME,</h2>
          <p className="text-center text-gray-300 mb-8 text-sm leading-relaxed">
            Build your real world skills which matters with our S-tier courses and we assure you a very bright future.
          </p>

          <form onSubmit={handleSignup} className="space-y-6">
            {formFields.map((field) => (
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
                    required={field.required}
                    minLength={field.minLength}
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 ${
                      field.hasToggle ? 'pr-12' : ''
                    }`}
                  />
                  {field.hasToggle && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Keep me signed in */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="keep"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="w-5 h-5 accent-blue-500 rounded"
              />
              <label htmlFor="keep" className="text-sm cursor-pointer">
                Keep me signed in
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#547792] hover:bg-[#B026FF] font-semibold rounded-lg transition disabled:opacity-70 shadow-lg mt-4"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;