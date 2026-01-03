import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, User, Phone, Eye, EyeOff, Menu, X } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
  const { login } = useAuth();

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

  const handleSignup = async (e:any) => {
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
          <strong>Signup Successful!</strong>
          <p className="text-sm mt-1">
            Welcome to Tic's Course, {fullName || email}!
          </p>
        </div>,
        { theme: 'dark' }
      );

      login(res.data.customToken || res.data.idToken, {
        uid: res.data.uid,
        email: res.data.email,
        fullName,
        phoneNumber,
        appId: res.data.appId || '',
      });

      if (keepSignedIn) {
        navigate('/Freetrial', { replace: true });
      }

      setEmail('');
      setFullName('');
      setPhoneNumber('');
      setPassword('');
    } catch (err:any) {
      toast.error(
        <div>
          <strong>Signup Failed</strong>
          <p className="text-sm mt-1">
            {err.response?.data?.message || 'Please try again'}
          </p>
        </div>,
        { theme: 'dark' }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#ECEFCA]">
      {/* Background */}
      <img
        src={backgroundImg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 px-4 sm:px-8 py-4 flex justify-between items-center z-30">
        <div className="flex items-center gap-3">
          <img
            src={logoImg}
            alt="Logo"
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
          />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 hidden sm:block">
            PesaPort
          </h1>
        </div>

        <nav className="hidden md:flex gap-4">
          <a
            href="/login"
            className="px-6 py-2 text-white bg-[#5C7C94] rounded-lg hover:bg-blue-800"
          >
            Log In
          </a>
          <a
            href="/Freetrial"
            className="px-6 py-2 border border-[#5C7C94] rounded-lg"
          >
            Free Trial
          </a>
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 w-72 h-full bg-white z-50 p-8 flex flex-col gap-6">
            <a href="/login" className="font-medium text-lg">Log In</a>
            <a
              href="/Freetrial"
              className="bg-blue-900 text-white py-3 rounded-lg text-center"
            >
              Free Trial
            </a>
          </div>
        </>
      )}

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-lg px-4 sm:px-6 mt-28">
        <div className="bg-[#0f172a]/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-2">
            WELCOME
          </h2>
          <p className="text-center text-gray-300 text-xs sm:text-sm mb-6">
            Build real-world skills with our S-tier courses.
          </p>

          <form onSubmit={handleSignup} className="space-y-5">
            {formFields.map((field) => (
              <div key={field.id}>
                <label className="flex items-center gap-2 text-sm mb-1">
                  <field.icon size={16} /> {field.label}
                </label>
                <div className={field.hasToggle ? 'relative' : ''}>
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                    minLength={field.minLength}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500 ${
                      field.hasToggle ? 'pr-12' : ''
                    }`}
                  />
                  {field.hasToggle && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-300"
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
              />
              Keep me signed in
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#547792] hover:bg-[#B026FF] rounded-lg font-semibold"
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
