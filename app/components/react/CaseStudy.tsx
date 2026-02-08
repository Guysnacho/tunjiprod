import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Quote, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const CaseStudy = () => {
  return (
    <section id="case-studies" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-600 text-amber-600" />
                  ))}
                </div>
                <span className="text-sm font-bold text-stone-500 ml-2 italic">4+ Year Partnership</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">MCBIOS: Powering MidSouth Bioinformatics</h3>
              <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                Since 2020, we have provided MCBIOS with a custom-designed conference experience, secure payment processing, and a massive video archive for member-exclusive educational content.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-stone-700 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-800" />
                  Year-over-year platform improvements
                </div>
                <div className="flex items-center gap-3 text-stone-700 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-800" />
                  Secure membership authentication
                </div>
                <div className="flex items-center gap-3 text-stone-700 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-800" />
                  Scalable video streaming libraries
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://mcbios.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-stone-50 rounded-xl font-bold hover:bg-emerald-950 transition-all shadow-lg shadow-stone-900/10"
                >
                  View Live Site <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-auto overflow-hidden bg-stone-100">
               <ImageWithFallback 
                src="https://images.unsplash.com/photo-1765371512992-843e6a92d7e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwaW50ZXJpb3IlMjBvZmZpY2UlMjBuYXR1cmFsJTIwbGlnaHR8ZW58MXx8fHwxNzcwNTY2MTM5fDA"
                alt="Warm Interior Meeting Space"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-stone-900/20" />
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
                <Quote className="text-emerald-800 mb-4" size={32} />
                <p className="text-stone-800 font-medium italic mb-4">
                  "The Conference Suite has transformed how we manage our annual symposium, providing a seamless experience for both our organizers and attendees."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-900">M</div>
                  <div>
                    <p className="font-bold text-stone-900 text-sm">MCBIOS Leadership</p>
                    <p className="text-stone-500 text-xs uppercase tracking-wider">Bioinformatics Society</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
