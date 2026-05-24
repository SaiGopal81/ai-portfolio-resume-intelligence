import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Sai Gopal | AI Data Engineer',
    template: '%s | Sai Gopal',
  },
  description: 'Portfolio of Sai Gopal, AI Data Engineer building autonomous data platforms and intelligent systems.',
  keywords: ['Data Engineer', 'AI Engineer', 'Portfolio', 'Sai Gopal', 'PySpark', 'Airflow'],
  authors: [{ name: 'Sai Gopal' }],
  creator: 'Sai Gopal',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://saigopal.dev',
    title: 'Sai Gopal | AI Data Engineer',
    description: 'Portfolio of Sai Gopal, AI Data Engineer building autonomous data platforms and intelligent systems.',
    siteName: 'Sai Gopal Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sai Gopal | AI Data Engineer',
    description: 'Portfolio of Sai Gopal, AI Data Engineer building autonomous data platforms and intelligent systems.',
    creator: '@saigopal',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sai Gopal',
  jobTitle: 'AI Data Engineer',
  url: 'https://saigopal.dev',
  sameAs: [
    'https://linkedin.com/in/saigopal',
    'https://github.com/saigopal'
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased overflow-x-hidden`}>
        {children}
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#1E293B',
            color: '#fff',
            border: '1px solid #334155',
          }
        }} />
      </body>
    </html>
  );
}
