'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export const BackButton = () => {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="inline-flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </button>
  );
};
