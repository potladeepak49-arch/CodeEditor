/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.56.1'],

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;