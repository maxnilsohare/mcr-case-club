/** @type {import('next').NextConfig} */
const nextConfig = {
  // Framer Motion + App Router: Strict Mode double-mount can leave motion/viewport
  // state inconsistent and produce a blank main area after refresh or client navigation.
  reactStrictMode: false
};

export default nextConfig;

