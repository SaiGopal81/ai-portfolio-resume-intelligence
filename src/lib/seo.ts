import { Metadata } from 'next';

export function getBaseMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function generatePersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sai Gopal',
    jobTitle: 'AI Data Engineer',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    sameAs: [
      'https://linkedin.com/in/saigopal',
      'https://github.com/saigopal'
    ]
  };
}

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sai Gopal - Portfolio',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  };
}
