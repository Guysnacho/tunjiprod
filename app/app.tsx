import React from 'react';
import { Navbar } from './components/react/Navbar';
import { Hero } from './components/react/Hero';
import { Features } from './components/react/Features';
import { Architecture } from './components/react/Architecture';
import { CaseStudy } from './components/react/CaseStudy';
import { ContactForm } from './components/react/ContactForm';
import { Footer } from './components/react/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Architecture />
        <CaseStudy />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
