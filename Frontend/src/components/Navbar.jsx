import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Stethoscope,
  Phone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
 const navigate = useNavigate();
  // Handle scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "User Registration", href: "/login" },
    { name: "Clinic Registration", href: "/clinic-registration" },
    // { name: "Contact", href: "/contact" },
    {  href: "/contact", icon: <Phone size={18} /> },
  ];

  return (
    <nav 
      className={`fixed top-0 bg-white  opacity-80 backdrop-blur-3xl left-0 w-full px-15 py-3 flex justify-between items-center z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 cursor-pointer group" onClick={()=>{
        navigate("/")
      }}>
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200  transition-transform duration-300">
        <Stethoscope  />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-black text-slate-900 tracking-tighter">Clinc<span className='text-blue-600'>Q</span></span>
          <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em]">Management System</span>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <button 
                onClick={() => navigate(link.href)}
            key={link.name}
            className="text-slate-700 hover:text-blue-600 text-sm font-bold uppercase tracking-wide transition-colors active:scale-95"
            
          >
            <div className="flex items-center gap-2">
            {link.icon && link.icon}
            {link.name}
          </div>
          </button>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-white z-[60] lg:hidden transition-transform duration-500 ease-in-out transform ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 relative">
          <button 
            className="absolute top-6 right-6 p-2 text-slate-600"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={32} />
          </button>
          
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-2xl font-black text-slate-900 hover:text-blue-600 transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-3">
                {link.icon && link.icon}
                {link.name?.toUpperCase()}
              </div>
            </a>
          ))}
          
          <button className="mt-4 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 active:scale-95 transition-transform">
            GET STARTED
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;