/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects(){
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true
      }
    ]
  },
  env:{
    NEXTAUTH_SECRET : process.env.NEXTAUTH_SECRET ?? ''
  },
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: "**"
          },
      ],
  },
  typescript: {
    ignoreBuildErrors: true,
 }
};
export default nextConfig;
