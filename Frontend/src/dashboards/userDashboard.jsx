import React, { useState, useMemo, useEffect } from "react";
import {
  MapPin,
  Star,
  Clock,
  ChevronRight,
  Search,
  Activity,
  LogOut,
  Menu,
  Stethoscope,
  Trash2,
} from "lucide-react";
import AppointmentDashboard from "./AppointmentDashboard";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const ClinicCard = ({ clinic, onBook }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
    <div className="relative h-40 md:h-48 overflow-hidden">
      <img
        src={clinic.clinicImage}
        alt={clinic.clinicName}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
    </div>

    <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-blue-600 text-xs font-bold uppercase tracking-wide mb-1">
            {clinic.category}
          </p>
          <h3 className="text-slate-900 font-bold text-lg leading-tight group-hover:text-blue-700">
            {clinic.clinicName}
          </h3>
        </div>

        <div className="flex items-center bg-amber-50 px-2 py-1 rounded-lg">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
          <span className="text-amber-700 text-xs font-bold">
            {clinic.rating || 4.5}
          </span>
        </div>
      </div>

      <div className="space-y-2 mt-auto text-slate-500 text-sm text-left">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2 shrink-0" />
          <span className="truncate">{clinic.address}</span>
        </div>

        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 shrink-0" />
          <span
            className={
              clinic.status === "Open Now"
              ? "text-emerald-600 font-medium"
                : "text-amber-600 font-medium"
              }
              >
            {clinic.status || "Open Now"}
          </span>
        </div>
      </div>

      <button
        onClick={() => onBook(clinic)}
        className="mt-6 w-full py-3 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 font-semibold rounded-xl transition-all flex items-center justify-center"
        >
        Book now <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  </div>
);

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("Clinics");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [clinics, setClinics] = useState([]);
  
  const [appointments, setAppointments] = useState([]);

  // Fetch clinics from backend
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const res = await API.get("/clinic/card");
        setClinics(res.data.data || []);
      } catch (err) {
        console.error("Clinic Fetch Error:", err);
      }
    };

    fetchClinics();
  }, []);
  
  const fetchAppointments = async () => {
    try {
      const { data } = await API.get("/user/appointment");
    setAppointments(data.data || []);
  } catch (error) {
    console.error("Fetch Appointment Error:", error);
  }
};



const handleBookClinic = (clinic) => {
  setSelectedClinic(clinic);
    setActiveTab("Appointment");
  };

  const deleteAppointment = async (id) => {
    try {
      await API.delete(`/user/appointment/${id}`);

      setAppointments((prev) =>
        prev.filter((app) => app._id !== id)
    );
  } catch (error) {
    console.error("Delete Error:", error);
  }
};

const filteredClinics = useMemo(
  () =>
    clinics.filter(
        (c) =>
          c.clinicName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.category?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [clinics, searchQuery]
  );
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");   // agar token save hai
  localStorage.removeItem("user");    // optional agar user data bhi save hai
  navigate("/");                      // home page redirect
};

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-slate-100 p-6">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xl mb-10">
          <Stethoscope size={24} /> ClinicQ
        </div>

        <nav className="flex flex-col gap-3 h-35">
          <button
            onClick={() => setActiveTab("Clinics")}
            className={`text-left px-4 py-2 rounded-xl ${
              activeTab === "Clinics"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Clinics
          </button>

          <button
            onClick={async () => {
              await fetchAppointments();
              setActiveTab("My Appointments");
            }}
            className={`text-left px-4 py-2 rounded-xl ${
              activeTab === "My Appointments"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            My Appointments
          </button>
        <button
  onClick={handleLogout}
  className="mt-auto text-slate-400 hover:text-red-500 flex items-center gap-2"
>
  <LogOut size={18} /> Log Out
</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          {/* Clinics */}
          {activeTab === "Clinics" && (
            <>
              <h1 className="text-4xl font-black text-slate-900 mb-8">
                Search <span className="text-blue-600">Clinics</span>
              </h1>

              <div className="max-w-xl bg-white p-2 rounded-2xl shadow-lg flex border border-slate-100 mb-10">
                <Search className="text-slate-400 m-3" size={20} />
                <input
                  type="text"
                  placeholder="Search clinics..."
                  className="w-full focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredClinics.map((c) => (
                  <ClinicCard
                    key={c._id}
                    clinic={c}
                    onBook={handleBookClinic}
                  />
                ))}
              </div>
            </>
          )}

          {/* Appointment Form */}
          {activeTab === "Appointment" && selectedClinic && (
            <AppointmentDashboard
              selectedClinic={selectedClinic}
             onConfirm={async () => {
              await fetchAppointments();
              setActiveTab("My Appointments");
              setSelectedClinic(null);
            }}
            />
          )}

          {/* Appointments */}
          {activeTab === "My Appointments" && (
            <>
              <h2 className="text-3xl font-bold mb-8">
                All Appointments
              </h2>

              {appointments.length === 0 ? (
                <p>No appointments found.</p>
              ) : (
                <div className="space-y-4">
                  {appointments.map((app) => (
                    <div
                      key={app._id}
                      className="bg-white p-6 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm"
                    >
                      <div>
                          <h4 className="font-bold text-lg">
                            {app.clinic?.clinicName}
                          </h4>
                          <p>
                            {app.patientName}, {app.patientAge}, 
                            {new Date(app.createdAt).toLocaleDateString("en-GB")}, 
                            {app.preferredTime}
                          </p>
                        </div>

                      <button
                        onClick={() => deleteAppointment(app._id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard