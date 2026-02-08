import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, ShieldCheck, Users } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background decoration with earth tones */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50/50 via-stone-50 to-stone-50 opacity-60" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-700"></span>
            </span>
            Trusted Academic Partner Since 2020
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-6">
            Elevate Your Conference <br className="hidden md:block" />
            <span className="text-emerald-900">With Natural Excellence</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-600 mb-10 leading-relaxed">
            A comprehensive management platform built for academic longevity. 
            Seamless integration, persistent data, and professional delivery for every event.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-emerald-900 text-stone-50 rounded-xl text-lg font-semibold hover:bg-emerald-950 transition-all shadow-lg shadow-emerald-900/20">
              Get Started
            </a>
            <a href="#features" className="w-full sm:w-auto px-8 py-4 bg-white text-stone-700 border border-stone-200 rounded-xl text-lg font-semibold hover:bg-stone-50 transition-all">
              Explore Features
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto rounded-2xl border border-stone-200 shadow-2xl overflow-hidden bg-stone-100"
        >
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1726384780582-40353de8d036?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b29kZW4lMjBhcmNoaXRlY3R1cmUlMjBjb25mZXJlbmNlJTIwaGFsbHxlbnwxfHx8fDE3NzA1NjYxMzl8MA"
            alt="Modern Wooden Conference Hall"
            className="w-full aspect-[16/9] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex items-end p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left">
              <div className="flex gap-4 items-start text-white">
                <div className="p-2 bg-emerald-600/30 backdrop-blur-md rounded-lg">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="font-bold">Recurring Events</h4>
                  <p className="text-sm text-stone-200">Bridge the gap between event years.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start text-white">
                <div className="p-2 bg-emerald-600/30 backdrop-blur-md rounded-lg">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold">Secure Access</h4>
                  <p className="text-sm text-stone-200">Unified member authentication.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start text-white">
                <div className="p-2 bg-emerald-600/30 backdrop-blur-md rounded-lg">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="font-bold">Member Portal</h4>
                  <p className="text-sm text-stone-200">Exclusive video content archives.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
