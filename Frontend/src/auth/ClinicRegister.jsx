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
  Building2,
  FileText,
  Phone,
  MapPin
} from 'lucide-react';
// import axios from "axios";
import API from "../api/axios";  
import { useNavigate } from "react-router-dom";

import Navbar from '../Components/Navbar';


const ClinicRegistration = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    clinicName: '',
    adminName: '',
   medicalLicense: '',
    adminEmail: '',
    phone: '',
    password: '',
    city: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    if (isLogin) {
      const { data } = await API.post("/auth/clinic/login", formData);

      alert(data.message);

      navigate("/clinic/dashboard");

    } else {
      const { data } = await API.post("/auth/clinic/register", formData);

      alert(data.message);

      setIsLogin(true);
    }

  } catch (error) {
    alert(error.response?.data?.message || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ 
      clinicName: '', 
      adminName: '', 
     medicalLicense: '', 
      adminEmail: '', 
      phone: '', 
      password: '', 
      city: '' 
    });
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#f0f7ff] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Medical Branding */}
       
       
        <h2 className="mt-2 text-sm font-medium text-blue-600 uppercase tracking-widest mt-10">
          {isLogin ? 'Welcome Partner' : 'Partner with ClinicQ'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-4 shadow-2xl shadow-blue-900/5 sm:rounded-3xl sm:px-10 border border-blue-50">
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {!isLogin && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Clinic Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type="text"
                      name="clinicName"
                      required
                      value={formData.clinicName}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g. City Health Center"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Medical License</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FileText className="h-5 w-5 text-blue-300" />
                      </div>
                      <input
                        type="text"
                        name="medicalLicense"
                        required
                        value={formData.medicalLicense}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="ID Number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">City</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-blue-300" />
                      </div>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Location"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                {isLogin ? 'Work adminEmail' : 'Administrator adminEmail'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-blue-300" />
                </div>
                <input
                  type="email"
                  name="adminEmail"
                  required
                  value={formData.adminEmail}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="admin@clinic.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Secure Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-300" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-blue-500"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>


            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center mb-5 py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-700 hover:bg-blue-800 shadow-lg shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <Activity className="animate-pulse h-5 w-5 text-white" />
              ) : (
                <>
                  {isLogin ? 'Clinic Login' : 'Register My Clinic'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-400 mb-6 uppercase tracking-widest font-bold">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span>Secure Professional Access</span>
            </div>
            
            <p className="text-center text-sm text-slate-500">
              {isLogin ? "Want to register your clinic?" : "Already a registered Clinic?"}
              <button
                onClick={toggleAuthMode}
                className="ml-1.5 font-bold text-blue-700 hover:text-blue-800 transition-colors underline decoration-blue-200 underline-offset-4"
              >
                {isLogin ? 'Get Started' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default ClinicRegistration;