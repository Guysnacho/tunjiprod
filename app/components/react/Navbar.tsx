import React from 'react';
import { motion } from 'motion/react';
import { Menu, X, ChevronRight } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-900 to-amber-800 bg-clip-text text-transparent">
              Conference Suite
            </span>
            <span className="hidden sm:block ml-2 text-xs font-medium text-stone-400 tracking-wider uppercase">
              by Tunji Productions
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-stone-600 hover:text-emerald-800 transition-colors font-medium">Features</a>
            <a href="#architecture" className="text-stone-600 hover:text-emerald-800 transition-colors font-medium">Architecture</a>
            <a href="#case-studies" className="text-stone-600 hover:text-emerald-800 transition-colors font-medium">Case Studies</a>
            <a href="#contact" className="px-5 py-2.5 bg-emerald-900 text-stone-50 rounded-lg hover:bg-emerald-950 transition-all font-medium flex items-center gap-2">
              Get Started <ChevronRight size={16} />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-600 hover:text-emerald-800">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-stone-50 border-b border-stone-200 px-4 pt-2 pb-6 space-y-4"
        >
          <a href="#features" className="block text-stone-600 font-medium py-2" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#architecture" className="block text-stone-600 font-medium py-2" onClick={() => setIsOpen(false)}>Architecture</a>
          <a href="#case-studies" className="block text-stone-600 font-medium py-2" onClick={() => setIsOpen(false)}>Case Studies</a>
          <a href="#contact" className="block px-5 py-3 bg-emerald-900 text-stone-50 rounded-lg font-medium text-center" onClick={() => setIsOpen(false)}>
            Get Started
          </a>
        </motion.div>
      )}
    </nav>
  );
};
