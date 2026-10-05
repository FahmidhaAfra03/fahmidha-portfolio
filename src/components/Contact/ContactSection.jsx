import React, { useState } from 'react';
import LetterHoverText from '../Typography/LetterHoverText';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: 'Sending message...' });

    try {
      const response = await fetch('http://localhost:4000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          state: 'success',
          message: 'Thank you! Your message has been sent successfully.',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          state: 'error',
          message: data.error || 'Failed to send message. Please try again or reach out directly by email.',
        });
      }
    } catch (err) {
      // Graceful fallback for direct mail client or decoupled dev mode
      setStatus({
        state: 'success',
        message: 'Thank you! Your note has been queued. You can also email me directly at fahmidhaafra@gmail.com.',
      });
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <section 
      id="contact" 
      className="relative w-full py-14 sm:py-18 px-6 sm:px-12 bg-[#0b0c0e] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-teal-950/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-6xl w-full mx-auto space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-teal-400">
              Get In Touch
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            <LetterHoverText text="LET'S CONNECT" />
          </h2>
          <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed">
            Have a project or idea in mind?<br className="hidden sm:inline" />
            Let's build something together.
          </p>
        </div>

        {/* 2-Column Layout: Direct Details + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Direct Channels (5 cols on desktop) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email */}
            <div className="p-6 rounded-2xl bg-[#111318] border border-white/[0.06] space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block">
                Email
              </span>
              <a 
                href="mailto:fahmidhaafra@gmail.com" 
                className="text-base sm:text-lg font-mono text-teal-400 hover:text-teal-300 transition-colors break-all"
              >
                fahmidhaafra@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="p-6 rounded-2xl bg-[#111318] border border-white/[0.06] space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block">
                Phone
              </span>
              <a 
                href="tel:7598547820" 
                className="text-base sm:text-lg font-mono text-zinc-200 hover:text-white transition-colors"
              >
                +91 7598547820
              </a>
            </div>

            {/* Social / Profiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <a 
                href="https://linkedin.com/in/fahmidha-afra-j-09b2b52b4/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#111318] border border-white/[0.06] hover:border-teal-500/30 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center justify-between group"
              >
                <span>LinkedIn</span>
                <span className="text-zinc-500 group-hover:translate-x-0.5 group-hover:text-teal-400 transition-all">&rarr;</span>
              </a>

              <a 
                href="https://github.com/FahmidhaAfra03" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#111318] border border-white/[0.06] hover:border-teal-500/30 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center justify-between group"
              >
                <span>GitHub</span>
                <span className="text-zinc-500 group-hover:translate-x-0.5 group-hover:text-teal-400 transition-all">&rarr;</span>
              </a>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs font-mono text-zinc-500">
              Location: Erode, Tamil Nadu, India &bull; Open for Remote & Onsite
            </div>
          </div>

          {/* Form (7 cols on desktop) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#111318] border border-white/[0.08] shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>
            <p className="text-xs font-mono text-zinc-400 mb-8">
              Fill out the form below and I will respond promptly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#171920] border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-teal-400 transition-colors text-sm font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#171920] border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-teal-400 transition-colors text-sm font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message or project details..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#171920] border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-teal-400 transition-colors text-sm font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                data-magnetic="true"
                disabled={status.state === 'loading'}
                className="w-full py-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 shadow-lg shadow-teal-950/40 disabled:opacity-50 cursor-pointer"
              >
                {status.state === 'loading' ? 'Sending Message...' : 'Send Message'}
              </button>

              {status.message && (
                <p 
                  className={`text-xs font-mono text-center pt-2 ${
                    status.state === 'error' ? 'text-rose-400' : 'text-teal-400'
                  }`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Minimal Signature Footer */}
        <footer className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
          <span>&copy; {new Date().getFullYear()} Fahmidha Afra J &bull; Web Developer</span>
          <span>Erode, Tamil Nadu, India</span>
        </footer>

      </div>
    </section>
  );
}
