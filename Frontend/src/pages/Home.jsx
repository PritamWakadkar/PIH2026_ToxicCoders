import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';

import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
<>
    <Navbar/>
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-900 font-sans">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.pinimg.com/736x/2d/61/25/2d6125d5cb5f09a4430c145d0e1d6bbe.jpg" 
          alt="Healthcare professional"
          className="h-full w-full object-cover object-center opacity-40"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2000&auto=format&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl space-y-8">
          {/* Main Heading */}
          <h1 className="flex flex-col text-xl md:text-7xl lg:text-6.5xl font-black tracking-tight leading-none text-white">
            <span className="block mb-2">THE</span>
            <span className="block text-blue-500 mb-2">QUEUE</span>
            <span className="block">MANAGEMENT</span>
            <span className="block">SYSTEM</span>
          </h1>

          {/* Subtext */}
          <p className="max-w-xl text-lg md:text-xl font-medium text-slate-200 leading-relaxed opacity-90">
            Our Queue Management System provides an organized and 
            time saving solution for small clinics.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-lg shadow-blue-600/30 active:scale-95">
           <Link to="/login">Get Started</Link>
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={22} />
            </button>
            
            
          </div>
        </div>
      </div>
    </div>
</>
  );
};

export default Home;