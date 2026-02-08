import React from 'react';
import { Linkedin, Globe, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-stone-100 border-t border-stone-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-900 to-amber-800 bg-clip-text text-transparent mb-6">
              Conference Suite
            </h3>
            <p className="text-stone-500 max-w-sm mb-8 leading-relaxed">
              Professional conference management platform built for academic and recurring events. Powered by Tunji Productions — trusted since 2020.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com/company/tunji-productions" className="p-2 bg-white border border-stone-200 rounded-lg text-stone-400 hover:text-emerald-800 hover:border-emerald-200 transition-all">
                <Linkedin size={20} />
              </a>
              <a href="https://tunjiproductions.com" className="p-2 bg-white border border-stone-200 rounded-lg text-stone-400 hover:text-emerald-800 hover:border-emerald-200 transition-all">
                <Globe size={20} />
              </a>
              <a href="mailto:contact@tunjiproductions.com" className="p-2 bg-white border border-stone-200 rounded-lg text-stone-400 hover:text-emerald-800 hover:border-emerald-200 transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#features" className="text-stone-500 hover:text-emerald-800 transition-colors">Features</a></li>
              <li><a href="#architecture" className="text-stone-500 hover:text-emerald-800 transition-colors">Architecture</a></li>
              <li><a href="#case-studies" className="text-stone-500 hover:text-emerald-800 transition-colors">Case Studies</a></li>
              <li><a href="https://docs.tunjiproductions.com" className="text-stone-500 hover:text-emerald-800 transition-colors">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="https://tunjiproductions.com" className="text-stone-500 hover:text-emerald-800 transition-colors">About Tunji Productions</a></li>
              <li><a href="#contact" className="text-stone-500 hover:text-emerald-800 transition-colors">Contact Support</a></li>
              <li><a href="#" className="text-stone-500 hover:text-emerald-800 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-stone-500 hover:text-emerald-800 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-200 flex flex-col md:row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-stone-400 text-sm">
            © 2026 Tunji Productions. All rights reserved. Built with care for conferences that matter.
          </p>
          <div className="flex gap-8 text-sm font-medium text-stone-400">
            <span>v2.4.0-stable</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
