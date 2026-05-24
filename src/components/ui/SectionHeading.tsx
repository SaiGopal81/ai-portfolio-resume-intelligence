import React from 'react';

export const SectionHeading = React.memo(({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
        {title}
      </h2>
      {subtitle && <p className="text-slate-400 max-w-2xl text-lg">{subtitle}</p>}
      <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-6" />
    </div>
  );
});
SectionHeading.displayName = 'SectionHeading';
