// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: {
    devtools: false,
  },
  // output: 'export', // Важно для Cloudflare Pages и Next.js 15+ (убери или закомментируй!)
  // другие настройки можно добавлять ниже, если нужно
};

module.exports = nextConfig;