export const SITE_CONFIG = {
  name: 'Sai Gopal',
  role: 'AI Data Engineer',
  tagline: 'Building Autonomous Data Platforms, Intelligent Data Pipelines, and AI-Powered Systems',
  url: 'https://saigopal.dev',
  description: 'Enterprise-grade AI Data Engineering platform and portfolio of Sai Gopal.',
};

export const CONTACT_INFO = {
  email: 'example@example.com',
  phone: '+91 XXXXXXXXXX',
  location: 'Odisha, India',
  linkedin: 'https://linkedin.com/in/saigopal',
  github: 'https://github.com/saigopal',
};

export const API_CONFIG = {
  rateLimits: {
    contactForm: { windowMs: 60 * 1000, maxRequests: 3 }, // 3 requests per minute
    resumeStudio: { windowMs: 60 * 1000, maxRequests: 5 },
    chatbot: { windowMs: 60 * 1000, maxRequests: 10 }
  }
};
