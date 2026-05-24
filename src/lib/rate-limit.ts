/** Rate limiter for API routes - sliding window in-memory */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    entry.timestamps = entry.timestamps.filter((t) => now - t < 900000);
    if (entry.timestamps.length === 0) store.delete(key);
  }
}, 300000);

export function rateLimit(config: RateLimitConfig) {
  return {
    check: (key: string): { success: boolean; remaining: number; resetAt: Date } => {
      const now = Date.now();
      const entry = store.get(key) || { timestamps: [] };

      // Remove timestamps outside the window
      entry.timestamps = entry.timestamps.filter((t) => now - t < config.windowMs);

      if (entry.timestamps.length >= config.maxRequests) {
        const oldest = entry.timestamps[0];
        return {
          success: false,
          remaining: 0,
          resetAt: new Date(oldest + config.windowMs),
        };
      }

      entry.timestamps.push(now);
      store.set(key, entry);

      return {
        success: true,
        remaining: config.maxRequests - entry.timestamps.length,
        resetAt: new Date(now + config.windowMs),
      };
    },
  };
}

export const contactLimiter = rateLimit({ maxRequests: 3, windowMs: 15 * 60 * 1000 });
export const chatbotLimiter = rateLimit({ maxRequests: 10, windowMs: 60 * 1000 });
export const resumeStudioLimiter = rateLimit({ maxRequests: 5, windowMs: 5 * 60 * 1000 });
