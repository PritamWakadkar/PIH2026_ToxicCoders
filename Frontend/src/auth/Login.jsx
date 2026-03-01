import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Stethoscope, 
  ShieldCheck,
  Activity,
  ArrowLeft
} from 'lucide-react';

import API from "../api/axios";

import { useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar';

/**
 * Clinic Authentication Component
 * Tailored for healthcare environments with a professional medical aesthetic.
 */
const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    if (isLogin) {
      await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      alert("Login Successful");
      // navigate("/dashboard");
      navigate("/user/dashboard");

    } else {
      await API.post("/auth/register", {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert("Registered Successfully");
      setIsLogin(true);
    }

  } catch (err) {
    alert(err.response?.data?.message || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-[98vh] bg-[#f0f7ff] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center"> 
              <h2 className="mt-2 text-sm font-medium text-blue-600 uppercase tracking-widest mt-10">
            {isLogin ? 'User/Patient LOgin' : 'User/Patient Register'}
          </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-[0_20px_50px_rgba(30,64,175,0.1)] sm:rounded-[2.5rem] sm:px-12 border border-blue-50 relative overflow-hidden">
          
          {/* Subtle background decoration */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full opacity-50"></div>
          
          <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
            
            {!isLogin && (
              <>
                {/* Full Name - Registration Only */}
                <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-slate-700 placeholder:text-slate-300"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

              </>
            )}

            {/* Email Address */}
            <div className="transition-all duration-300">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
                {isLogin ? 'Email Address' : 'Contact Email'}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-slate-700 placeholder:text-slate-300"
                  placeholder="name@healthcare.com"
                />
              </div>
            </div>


            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-slate-700 placeholder:text-slate-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-blue-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500/20 border-slate-200 rounded-lg cursor-pointer transition-all"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-500 cursor-pointer select-none">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Forgot?</a>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <Activity className="animate-spin h-5 w-5 text-white" />
              ) : (
                <>
                  {isLogin ? 'Login' : 'Create Account'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50 text-center relative z-10">
            <div className="flex items-center justify-center space-x-2 text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-widest">
              <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
              <span>End-to-end encrypted connection</span>
            </div>
            
            <p className="text-sm text-slate-500">
              {isLogin ? "New to ClinicQ?" : "Already have an account?"}
              <button
                onClick={toggleAuthMode}
                className="ml-2 font-bold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center"
              >
                {isLogin ? (
                  <>Register now <ArrowRight className="ml-1 w-3 h-3" /></>
                ) : (
                  <>Sign in here <ArrowLeft className="ml-1 w-3 h-3 order-first mr-1" /></>
                )}
              </button>
            </p>
          </div>
        </div>        
      </div>
    </div>
    </>
  );
};

export default LoginSignup;