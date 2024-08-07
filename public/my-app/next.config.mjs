/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    NEXTAUTH_SECRET : process.env.NEXTAUTH_SECRET ?? ''
  },
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'assets.example.com',
              port: '',
              pathname: '/account123/**',
          },
      ],
  },
};

export default nextConfig;
