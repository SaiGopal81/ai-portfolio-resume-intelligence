'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error();
      
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading 
            title="Get In Touch" 
            subtitle="Looking for new opportunities or have a question? Let's connect."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-12">
          
          <div className="lg:col-span-2 space-y-6">
            <ScrollReveal direction="right">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <ContactInfo icon={<Mail />} label="Email" value="saigopal.potnuru@gmail.com" href="mailto:saigopal.potnuru@gmail.com" />
                <ContactInfo icon={<Phone />} label="Phone" value="+91 7205228***" href="tel:+917205228***" />
                <ContactInfo icon={<MapPin />} label="Location" value="Odisha, India" />
                <ContactInfo icon={<FaLinkedin />} label="LinkedIn" value="linkedin.com/in/sai-gopal-399067267" href="https://www.linkedin.com/in/sai-gopal-399067267/" />
                <ContactInfo icon={<FaGithub />} label="GitHub" value="github.com/SaiGopal81" href="https://github.com/SaiGopal81" />
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-3">
            <ScrollReveal direction="left">
              <GlowCard className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-slate-300">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="Sai Gopal"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="saigopal.potnuru@gmail.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-slate-300">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="Project Discussion"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                      placeholder="Hi Sai, I'd like to talk about..."
                    />
                  </div>
                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : <>Send Message <Send className="w-4 h-4 ml-2" /></>}
                  </Button>
                </form>
              </GlowCard>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};

const ContactInfo = ({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href?: string }) => {
  const content = (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:bg-slate-800 hover:border-slate-700 transition-all group">
      <div className="p-3 bg-slate-800 rounded-lg text-slate-400 group-hover:text-blue-400 transition-colors">
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-5 h-5' })}
      </div>
      <div>
        <div className="text-sm font-medium text-slate-500">{label}</div>
        <div className="text-white font-medium">{value}</div>
      </div>
    </div>
  );

  return href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{content}</a> : content;
};
