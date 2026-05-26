import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const Footer = React.memo(() => {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm tracking-tighter">SG</span>
          </div>
          <span className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Sai Gopal. All rights reserved.
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="https://github.com/SaiGopal81" target="_blank" className="text-slate-400 hover:text-white transition-colors">
            <FaGithub className="w-5 h-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://www.linkedin.com/in/sai-gopal-399067267/" target="_blank" className="text-slate-400 hover:text-white transition-colors">
            <FaLinkedin className="w-5 h-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="mailto:saigopal.potnuru@gmail.com" className="text-slate-400 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  );
});
Footer.displayName = 'Footer';
