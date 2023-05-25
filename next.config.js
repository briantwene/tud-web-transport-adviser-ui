/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3443/:path*"
      }
    ];
  }
};

module.exports = nextConfig;
