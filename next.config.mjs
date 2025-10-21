/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Using only local images in /public
    remotePatterns: []
  }
};

export default nextConfig;
