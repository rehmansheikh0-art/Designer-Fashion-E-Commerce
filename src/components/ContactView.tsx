import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Bridal Consultation');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-[#E8E2D9] text-center space-y-3">
        <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#C5A880] font-semibold">
          Personal Concierge Service
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#181616]">
          Contact Our Atelier & Book Appointments
        </h1>
        <p className="text-xs sm:text-sm text-[#5C544E] max-w-lg mx-auto">
          Schedule a private fitting session with our master tailors at our New York studio or inquire about custom couture orders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Contact Form Left */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#181616]">Book Fitting or Request Inquiry</h2>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#181616] mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Princess Layla"
                  className="w-full p-3 border border-[#E8E2D9] rounded-xl bg-[#FAF8F5] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#181616] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full p-3 border border-[#E8E2D9] rounded-xl bg-[#FAF8F5]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#181616] mb-1">Inquiry Type</label>
                  <select
                    value={service}
                    onChange={e => setService(e.target.value)}
                    className="w-full p-3 border border-[#E8E2D9] rounded-xl bg-[#FAF8F5]"
                  >
                    <option value="Bridal Consultation">Bridal Trousseau Consultation</option>
                    <option value="Bespoke Custom Stitching">Bespoke Custom Fitting</option>
                    <option value="Order Support">Existing Order Support</option>
                    <option value="Press & VIP Stylist">Press & VIP Stylist Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#181616] mb-1">Your Message / Event Date</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us about your event date, preferred dress styles, or custom measurements..."
                  className="w-full p-3 border border-[#E8E2D9] rounded-xl bg-[#FAF8F5]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#181616] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C5A880] hover:text-[#181616] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Send className="w-4 h-4" /> Send Atelier Inquiry
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] p-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-[#181616]">Inquiry Received!</h3>
              <p className="text-xs text-[#5C544E]">
                Thank you {name}. A senior client concierge will contact you within 4 business hours to confirm your fitting appointment.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 border border-[#E8E2D9] text-xs font-semibold rounded-xl hover:bg-white"
              >
                Send Another Inquiry
              </button>
            </div>
          )}
        </div>

        {/* Contact Information & Map Right */}
        <div className="space-y-6">
          <div className="bg-[#181616] text-white p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#C5A880]">Direct Studio Concierge</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C5A880] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-white">New York Atelier Studio</h4>
                  <p className="text-[#A3998E]">450 Fifth Avenue, Floor 18, New York, NY 10018</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#C5A880] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-white">Telephone & VIP Hotline</h4>
                  <p className="text-[#A3998E] font-mono">+1 (800) 892-COUTURE | +1 (212) 555-0192</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#C5A880] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-white">Email Concierge</h4>
                  <p className="text-[#A3998E]">concierge@ariavance.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#C5A880] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-white">Atelier Business Hours</h4>
                  <p className="text-[#A3998E]">Monday – Saturday: 10:00 AM – 7:00 PM EST (By Appointment)</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/?text=Hello%20Aria%20Vance%20Atelier"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-[#25D366] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#1EBE57] transition-all"
            >
              <MessageCircle className="w-4 h-4" /> Live Chat via WhatsApp Concierge
            </a>
          </div>

          {/* Map Mockup Card */}
          <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#E8E2D9] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#181616]">Studio Location Map</h4>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-200 border border-[#E8E2D9] flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80"
                alt="Map location preview"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="bg-white px-4 py-2 rounded-full shadow-lg text-xs font-bold text-[#181616] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-600" /> Fifth Avenue Atelier Studio
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
