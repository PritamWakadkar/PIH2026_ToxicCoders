import React from 'react';
import { Activity, User, Mail, Linkedin, Phone, Github } from 'lucide-react';
import Navbar from '../Components/Navbar';  

const Contact = () => {
  const developers = [
    {
      name: "TARUN GAJJALWAR",
      role: "Full Stack Web Developer",
      linkedin: "https://linkedin.com/in/tarun-gajjalwar",
      gmail: "tarungajjalwar555@gmail.com",
      github: "https://github.com/tarun-gajjalwar",
      avatar: "https://avatars.githubusercontent.com/u/189034047?v=4"
    },
    {
      name: "RANJEET SHINDE",
      role: "Frontend Developer",
      linkedin: "https://linkedin.com/in/shinde-ranjeet",
      gmail: "ranjeetshinde2212@gmail.com",
      github: "https://github.com/codewith-Ranjeet",
    avatar: "https://avatars.githubusercontent.com/u/218772983?v=4"
    },
    {
      name: "PRITAM WAKADKAR",
      role: "Backend Developer",
      linkedin: "https://linkedin.com/in/pritam-wakadkar",
      gmail: "pritamwakadkar@gmail.com",
      github: "https://github.com/PritamWakadkar",
      avatar: "https://avatars.githubusercontent.com/u/210560599?v=4"
    },
    {
      name: "SAI MUTTHALAKR",
      role: "Frontend Specialist",
      linkedin: "https://www.linkedin.com/in/sai-mutthalkar-774424362",
      gmail: "saimutthalkar@gmail.com",
      github: "https://github.com/codewith-sai",
      avatar: "https://avatars.githubusercontent.com/u/250849118?v=4"
    },
    {
      name: "SHRIYANSH SAHU",
      role: "AI & Python Developer",
      linkedin: "https://www.linkedin.com/in/shriyansh-sahu-346a78281",
      gmail: "shriyanshsahu228@gmail.com",
      github: "https://github.com/shriyanshsahu228-png",
      avatar: "https://media.licdn.com/dms/image/v2/D5603AQG_hYenr5NlDQ/profile-displayphoto-scale_200_200/B56ZsTSaEJG8AY-/0/1765555154396?e=1773878400&v=beta&t=mMwsdqWY4S2kdWagwdt_NgA9Xpr3lpoVYb9cb2dlO_U"
    },
    {
      name: "PIYUSH MATTE",
      role: "UI/UX Designer",
      linkedin: "https://linkedin.com/in/username6",
      gmail: "xyz@gmail.com",
      github: "https://github.com/username6",
      avatar: "p"
    }
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen mt-8 bg-slate-50 font-sans p-6 md:p-12 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        
       

        {/* Page Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Meet Our Toxic_Coders Team</h1>
          
        </div>

        {/* Developer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {developers.map((dev, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              {/* Profile Image with Fallback */}
              <div className="relative w-28 h-28 mb-6 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-blue-50 ring-offset-2 ring-offset-white shadow-inner bg-slate-100 flex items-center justify-center">
                  <img 
                    src={dev.avatar} 
                    alt={dev.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden items-center justify-center w-full h-full text-blue-600 bg-blue-50">
                    <User size={48} strokeWidth={1.5} />
                  </div>
                </div>
                {/* Active Status Badge */}
                <div className="absolute bottom-1 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-1 uppercase leading-tight">{dev.name}</h3>
              <p className="text-blue-600 font-semibold text-xs uppercase tracking-widest mb-6">{dev.role}</p>
              
              {/* Contact Buttons */}
              <div className="flex flex-col gap-3 w-full">
                {/* LinkedIn Button */}
                <a 
                  href={dev.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 py-3 bg-[#0077B5] hover:bg-[#00669c] text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-100 active:scale-95 text-sm"
                  >
                  <Linkedin size={18} /> LinkedIn Profile
                </a>

                {/* Gmail Button */}
                <a 
                  href={`mailto:${dev.gmail}`}
                  className="flex items-center justify-center gap-3 py-3 bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 font-bold rounded-2xl transition-all border-2 border-slate-100 hover:border-red-100 active:scale-95 text-sm"
                >
                  <Mail size={18} /> Gmail
                </a>

                {/* GitHub Link */}
                <a 
                  href={dev.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-xs font-medium mt-2"
                >
                  <Github size={14} /> View GitHub
                </a>
              </div>
            </div>
          ))}
        </div>

        

        {/* Footer info */}
        <p className="text-center text-slate-400 text-sm mt-12 pb-8">
          © {new Date().getFullYear()} clinicQ. Built with passion for healthcare professionals.
        </p>
      </div>
    </div>
                  </>
  );
};

export default Contact;