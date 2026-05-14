import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-[#222222]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-12">
            <div className="text-2xl font-bold tracking-tighter">STINGER</div>
            
            <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Shop</a>
              <a href="#" className="hover:text-white transition-colors">Collections</a>
              <a href="#" className="hover:text-white transition-colors">About</a>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..."
                className="bg-[#111] border border-[#333] text-sm pl-10 py-3 w-80 rounded-full focus:outline-none focus:border-white"
              />
            </div>

            <button className="text-2xl hover:text-white transition-colors">♡</button>
            <button className="text-2xl hover:text-white transition-colors relative">🛒</button>
            <button className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-semibold">HR</button>
          </div>
        </div>
      </div>
    </nav>
  );
}