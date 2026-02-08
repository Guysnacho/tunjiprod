import React from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  Video, 
  FileEdit, 
  Layout, 
  CreditCard, 
  Lock 
} from 'lucide-react';

const features = [
  {
    title: "Multi-tenant Platform",
    description: "Centralized management dashboard for Tunji Productions admins to oversee all hosted conferences.",
    icon: Globe
  },
  {
    title: "Video Package",
    description: "Professional content hosting via Cloudflare R2 with multipart uploads and member-exclusive access.",
    icon: Video
  },
  {
    title: "Dynamic Form Builder",
    description: "Create customizable registration forms and data collection templates with easy persistence.",
    icon: FileEdit
  },
  {
    title: "Personalized Scheduling",
    description: "Admin schedule builder for the event and individual agenda builders for attendees.",
    icon: Layout
  },
  {
    title: "Integrated Payments",
    description: "Seamless Stripe integration for registration fees, member dues, and recurring sponsorships.",
    icon: CreditCard
  },
  {
    title: "Universal Authentication",
    description: "Supabase-powered cross-subdomain session management maintaining profiles across event years.",
    icon: Lock
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-emerald-800 uppercase tracking-widest mb-3">Core Platform</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6">Built for Academic Continuity</h3>
          <p className="max-w-2xl mx-auto text-lg text-stone-600">
            A harmonious blend of advanced technology and intuitive design, tailored for professional event management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-white border border-stone-200 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-stone-50 border border-stone-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors`}>
                <feature.icon className="text-emerald-800" size={24} />
              </div>
              <h4 className="text-xl font-bold text-stone-900 mb-3">{feature.title}</h4>
              <p className="text-stone-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
