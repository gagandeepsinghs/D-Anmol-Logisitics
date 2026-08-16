'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-16 bg-slate-50">
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-16 text-center relative z-0">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">Contact Us</h1>
          <p className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            Have questions about pricing, fleet availability, or custom route contracts? Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Contact Contents Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        
        {/* Left Side: Contact Information & Map */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Info Card */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-6 relative z-10">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 border-l-4 border-red-600 pl-3.5">
              Office Details
            </h2>
            
            <div className="flex flex-col gap-4 text-sm text-slate-655">
              <div className="flex items-start gap-3">
                <span className="text-base mt-0.5">📞</span>
                <div>
                  <strong className="block text-slate-800 font-bold">Call Us</strong>
                  <div className="flex flex-col gap-0.5">
                    <a href="tel:+919041687157" className="text-red-650 font-medium hover:underline">+91 90416 87157</a>
                    <a href="tel:+919911344396" className="text-red-650 font-medium hover:underline">+91 99113 44396</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-base mt-0.5">✉️</span>
                <div>
                  <strong className="block text-slate-800 font-bold">Email Us</strong>
                  <a href="mailto:info@danmol.com" className="text-red-650 font-medium hover:underline">info@danmol.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-base mt-0.5">📍</span>
                <div>
                  <strong className="block text-slate-800 font-bold">Main Address</strong>
                  <span className="text-slate-600">Shop No. 298, 1st Floor, Gali No. 4, Burail, Sector 45, Chandigarh - 160047</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-base mt-0.5">⏰</span>
                <div>
                  <strong className="block text-slate-800 font-bold">Working Hours</strong>
                  <span className="text-slate-600">Open 24/7 (Emergency Dispatch)<br />Office support: 9:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Styled Google Maps Placeholder */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 h-72 relative overflow-hidden flex flex-col items-center justify-center">
            {/* Maps iframe fallback */}
            <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center p-6 text-center gap-2">
              <span className="text-3xl text-slate-400">🗺️</span>
              <h3 className="font-bold text-slate-700 text-sm">Interactive Google Map</h3>
              <p className="text-slate-500 text-[11px] max-w-xs">
                To integrate, replace this with your Google Maps API iframe. Burail, Sector 45, Chandigarh, India.
              </p>
              <a
                href="https://maps.google.com/?q=Burail+Sector+45+Chandigarh"
                target="_blank"
                rel="noreferrer"
                className="mt-2 text-xs font-bold text-red-600 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-xs hover:bg-slate-50"
              >
                View on Google Maps
              </a>
            </div>
          </div>

        </div>

        {/* Right Side: Contact Enquiry Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-6 relative z-10">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 border-l-4 border-red-600 pl-3.5">
            Send an Enquiry
          </h2>
          
          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center flex flex-col items-center gap-2 my-auto">
              <span className="text-3xl">✅</span>
              <h3 className="font-bold text-base">Message Sent Successfully!</h3>
              <p className="text-xs text-green-700 max-w-sm">
                Thank you for contacting D Anmol Enterprises. Our customer care desk will reach out to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-green-750 text-white bg-green-600 hover:bg-green-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase">Your Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-xs font-bold text-slate-700 uppercase">Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="10-digit mobile number"
                  className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase">Email Address <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="yourname@domain.com"
                  className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase">Message <span className="text-red-500">*</span></label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Describe your requirement (E.g. multiple loading points, recurring cab trips...)"
                  className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 py-3 bg-red-650 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-sm transition-colors cursor-pointer disabled:bg-slate-400"
              >
                {isSubmitting ? 'Sending Message...' : 'Submit Enquiry'}
              </button>
            </form>
          )}

        </div>

      </section>

    </div>
  );
}
