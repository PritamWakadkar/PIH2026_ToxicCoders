import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Star,
  ChevronRight,
  X,
  Save,
  Plus,
  Trash2,
  Stethoscope,
  LogOut,
} from "lucide-react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";


const ClinicModal = ({ clinic, mode, onClose, onSave }) => {
  const isAddMode = mode === "add";
  
  const defaultData = {
    clinicName: "",
    category: "GENERAL PRACTICE",
    rating: 5,
    address: "",
    clinicImage:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
    };

    const [formData, setFormData] = useState(defaultData);

    useEffect(() => {
      if (clinic) setFormData(clinic);
      else setFormData(defaultData);
  }, [clinic]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">
            {isAddMode ? "Add Clinic" : "Edit Clinic"}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            type="text"
            required
            placeholder="Clinic Name"
            value={formData.clinicName}
            onChange={(e) =>
              setFormData({ ...formData, clinicName: e.target.value })
            }
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="number"
            step="0.1"
            placeholder="Rating"
            value={formData.rating}
            onChange={(e) =>
              setFormData({
                ...formData,
                rating: parseFloat(e.target.value) || 0,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
            />
          {/* Clinic Image URL */}
<div>
  <label className="block text-sm font-semibold mb-2">
    Clinic Image URL
  </label>

  <input
    type="text"
    placeholder="Paste image URL here"
    value={formData.clinicImage}
    onChange={(e) =>
      setFormData({ ...formData, clinicImage: e.target.value })
    }
    className="w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
    />
</div>

{formData.clinicImage && (
  <div className="mt-3">
    <img
      src={formData.clinicImage}
      alt="Preview"
      className="w-full h-40 object-cover rounded-2xl"
      onError={(e) =>
        (e.target.src =
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d")
        }
        />
  </div>
)}

          <input
            type="text"
            required
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full border rounded-xl px-4 py-3"
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2">
            {isAddMode ? <Plus size={18} /> : <Save size={18} />}
            {isAddMode ? "Add Clinic" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};


const ClinicCard = ({ clinic, onEdit, onDelete }) => {
  return (
    <div className="relative bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition p-6 group">
      <img
        src={clinic.clinicImage}
        alt={clinic.clinicName}
        className="w-full h-40 object-cover rounded-2xl mb-4"
        />

      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-blue-600 uppercase">
          {clinic.category}
        </span>
        <div className="flex items-center gap-1 text-amber-500">
          <Star size={14} />
          <span className="text-sm font-bold">{clinic.rating}</span>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-2">{clinic.clinicName}</h3>

      <div className="flex items-center text-gray-500 text-sm mb-1">
        <MapPin size={14} className="mr-2" />
        {clinic.address}
      </div>

      <div className="flex items-center text-green-600 text-sm mb-4">
        <Clock size={14} className="mr-2" />
        Open Now
      </div>

      <button
        onClick={() => onEdit(clinic)}
        className="w-full bg-slate-100 hover:bg-blue-600 hover:text-white py-2 rounded-xl flex items-center justify-center gap-2 transition"
        >
        Update <ChevronRight size={16} />
      </button>

      <button
        onClick={() => onDelete(clinic._id)}
        className="absolute bottom-20 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};


export default function ClinicDashboard() {
  const navigate = useNavigate();
  const [clinics, setClinics] = useState([]);
  const [activeTab, setActiveTab] = useState("Clinics");
  const [modalState, setModalState] = useState({
    isOpen: false,
    clinic: null,
    mode: "add",
  });
  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/", { replace: true });
  };

  const fetchClinics = async () => {
    try {
      const res = await API.get("/clinic/card");
      setClinics(res.data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  const handleSaveClinic = async (data) => {
    try {
      if (modalState.mode === "add") {
        await API.post("/clinic/card", data);
      } else {
        await API.put(`/clinic/card/${data._id}`, data);
      }

      fetchClinics();
      setModalState({ isOpen: false, clinic: null, mode: "add" });
    } catch (err) {
      console.error("Save Error:", err);
    }
  };

  const handleDeleteClinic = async (id) => {
    try {
      await API.delete(`/clinic/card/${id}`);
      fetchClinics();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
  <div className="flex min-h-screen bg-slate-50">

    {/* Sidebar */}
    <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-slate-100 p-6">
      <div className="flex items-center gap-2 text-blue-600 font-bold text-xl mb-10">
        <Stethoscope size={24} /> ClinicQ
      </div>

      <nav className="flex flex-col gap-3 h-25">
        <button
          onClick={() => setActiveTab("Clinics")}
          className={`text-left px-4 py-2 rounded-xl ${
            activeTab === "Clinics"
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          All My Clinics
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
    <div className="flex-1 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Add Your Own Clinic</h1>

        <button
          onClick={() =>
            setModalState({ isOpen: true, clinic: null, mode: "add" })
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          Add Clinic
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {clinics.map((clinic) => (
          <ClinicCard
            key={clinic._id}
            clinic={clinic}
            onEdit={(c) =>
              setModalState({ isOpen: true, clinic: c, mode: "edit" })
            }
            onDelete={handleDeleteClinic}
          />
        ))}
      </div>
    </div>

    {modalState.isOpen && (
      <ClinicModal
        clinic={modalState.clinic}
        mode={modalState.mode}
        onClose={() =>
          setModalState({ isOpen: false, clinic: null, mode: "add" })
        }
        onSave={handleSaveClinic}
      />
    )}
  </div>
);
}