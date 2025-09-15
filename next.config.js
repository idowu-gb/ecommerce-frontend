/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "images.unsplash.com",
      "picsum.photos",
      "placekitten.com",
      "placehold.co",
    ],
  },
};

module.exports = nextConfig;
