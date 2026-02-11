/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    remotePatterns: [
      {
        hostname: "blush.design",
      },
    ],
  },
};

module.exports = nextConfig;
