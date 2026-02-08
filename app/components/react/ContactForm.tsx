import React from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';

export const ContactForm = () => {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-stone-50 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6">Ready to Elevate Your Conference?</h2>
            <p className="text-lg text-stone-600">
              Partner with Tunji Productions and leverage the power of the Conference Suite for your next event.
            </p>
          </div>

          <div className="bg-stone-50 rounded-3xl border border-stone-200 shadow-2xl p-8 md:p-12 relative">
            <div className="absolute top-4 right-8 text-emerald-800/10 font-bold text-6xl select-none">Contact</div>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 uppercase tracking-wider">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Jane Doe"
                    className="w-full px-5 py-4 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 uppercase tracking-wider">Work Email</label>
                  <input 
                    required
                    type="email" 
                    placeholder="jane@university.edu"
                    className="w-full px-5 py-4 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-stone-700 uppercase tracking-wider">Organization</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Bioinformatics Society of America"
                    className="w-full px-5 py-4 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-stone-700 uppercase tracking-wider">Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Briefly describe your conference goals..."
                    className="w-full px-5 py-4 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800 transition-all resize-none shadow-sm"
                  ></textarea>
                </div>
                <div className="md:col-span-2 mt-4">
                  <button 
                    type="submit"
                    className="w-full py-5 bg-emerald-900 text-stone-50 rounded-xl text-lg font-bold hover:bg-emerald-950 transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/10"
                  >
                    Send Inquiry <Send size={20} />
                  </button>
                  <p className="text-center text-stone-400 text-xs mt-6 font-medium uppercase tracking-widest">
                    Built for academic excellence
                  </p>
                </div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-800">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-bold text-stone-900 mb-4">Message Sent</h3>
                <p className="text-stone-600 max-w-md mx-auto mb-8">
                  Your inquiry has been received. Tunji Productions will review your request and reach out within 24 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 text-emerald-900 font-bold hover:bg-emerald-50 rounded-xl transition-all"
                >
                  Return to Form
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
