/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'img.clerk.com',
      'i.ytimg.com',
      'images.unsplash.com',
    ],
  },
}

export default nextConfig