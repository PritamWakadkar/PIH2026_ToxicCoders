import React, { useState } from 'react';
import {
  Calendar,
  User,
  Clock,
  AlertCircle,
  CheckCircle2,
  Hash
} from 'lucide-react';
import API from "../api/axios";

const UserAppointmentDashboard = ({ selectedClinic, onConfirm }) => {
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    username: '',
    age: '',
    time: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.username || !formData.age || !formData.time) {
//       setMessage({
//         type: 'error',
//         text: 'All fields are required!'
//       });
//       return;
//     }

//     onConfirm(formData);

//     setMessage({
//       type: 'success',
//       text: 'Appointment Successfully Registered!'
//     });

//     setFormData({
//       username: '',
//       age: '',
//       time: ''
//     });
//   };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.username || !formData.age || !formData.time) {
    setMessage({
      type: "error",
      text: "All fields are required!",
    });
    return;
  }

  if (!selectedClinic?._id) {
setMessage({
  type: "error",
  text: "Clinic not selected!",
});
return;
}
  try {
    const { data } = await API.post("/user/appointment", {
      patientName: formData.username,
      patientAge: Number(formData.age),
      preferredTime: formData.time,
      clinic: selectedClinic?._id,   // 👈 important
    });


    setMessage({
      type: "success",
      text: data.message || "Appointment Successfully Registered!",
    });

    setFormData({
      username: "",
      age: "",
      time: "",
    });

  } catch (error) {
    console.log(error.response?.data);

    setMessage({
      type: "error",
      text: error.response?.data?.message || "Something went wrong!",
    });
  }
};
  return (
    <div className="min-h-screen bg-slate-50 font-sans p-6 md:p-10 flex items-center justify-center">
      <div className="max-w-4xl w-full">

        {/* Header */}
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-slate-800">
            {selectedClinic?.clinicName}
          </h1>
          <p className="text-slate-500 mt-1">
            Schedule appointment for {new Date().toLocaleDateString('en-GB')}
          </p>
        </header>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">

          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
            <Calendar className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-slate-800">
              Book New Appointment
            </h2>
          </div>

          {/* Status Message */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                message.type === 'error'
                  ? 'bg-red-50 text-red-700 border border-red-100'
                  : 'bg-green-50 text-green-700 border border-green-100'
              }`}
            >
              {message.type === 'error' ? (
                <AlertCircle size={20} />
              ) : (
                <CheckCircle2 size={20} />
              )}
              <p className="font-medium">{message.text}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Patient Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <User size={16} className="text-slate-400" />
                Patient Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter patient full name"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Hash size={16} className="text-slate-400" />
                Patient Age<span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                name="age"
                placeholder="Enter age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Time */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Clock size={16} className="text-slate-400" />
                Preferred Time<span className="text-red-600">*</span>
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full md:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-95"
              >
                Confirm Appointment
              </button>
            </div>

          </form>
        </div>

        <footer className="mt-12 text-center">
          <p className="text-slate-400 text-xs">
            © 2026 ClinicQ Medical Systems
          </p>
        </footer>
      </div>
    </div>
  );
};

export default UserAppointmentDashboard;