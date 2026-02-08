import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Layers, Server, Fingerprint, Database } from 'lucide-react';

export const Architecture = () => {
  return (
    <section id="architecture" className="py-24 bg-stone-900 text-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-3">System Architecture</h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-8 text-stone-100">Robust Multi-Tenant Backbone</h3>
            <p className="text-stone-400 text-lg mb-10 leading-relaxed">
              Our infrastructure is built for reliability and scale, using a sophisticated multi-domain architecture that keeps data secure while maintaining high availability.
            </p>

            <div className="space-y-6">
              <div className="flex gap-5 items-start">
                <div className="mt-1 p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <Layers size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1 text-stone-200">Subdomain Isolation</h4>
                  <p className="text-stone-400">Isolated environments for each conference ensure data privacy and performance stability.</p>
                </div>
              </div>
              
              <div className="flex gap-5 items-start">
                <div className="mt-1 p-2 bg-amber-500/10 rounded-lg text-amber-500">
                  <Fingerprint size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1 text-stone-200">Universal Auth</h4>
                  <p className="text-stone-400">Single sign-on across all conference subdomains powered by Supabase Auth.</p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="mt-1 p-2 bg-stone-500/10 rounded-lg text-stone-300">
                  <Database size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1 text-stone-200">Scalable Storage</h4>
                  <p className="text-stone-400">Video libraries hosted on Cloudflare R2 for global low-latency content delivery.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-emerald-900/40 blur-[100px] -z-10" />
            <div className="rounded-2xl border border-stone-700 bg-stone-800/50 p-4 backdrop-blur-sm shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1762518859390-6d48c38a9afe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwbGFuZHNjYXBlJTIwZm9yZXN0JTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzA1NjYxMzl8MA"
                alt="Natural Landscape Architecture visualization"
                className="w-full rounded-xl opacity-80"
              />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-stone-700/50 border border-stone-600 rounded-lg p-4 text-center">
                  <p className="text-xs text-stone-400 uppercase mb-1 font-bold">Performance</p>
                  <p className="text-2xl font-bold text-emerald-400">High</p>
                </div>
                <div className="bg-stone-700/50 border border-stone-600 rounded-lg p-4 text-center">
                  <p className="text-xs text-stone-400 uppercase mb-1 font-bold">Latency</p>
                  <p className="text-2xl font-bold text-amber-500">&lt;50ms</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
