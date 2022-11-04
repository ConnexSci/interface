/** @type {import('next').NextConfig} */

const rewrites = () => {
  return [
    {
      source: "/hello/:path*",
      destination: "http://localhost:5000/hello/:path*",
    },
  ];
};

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites
}

module.exports = nextConfig
