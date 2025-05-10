import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'yuc389qrwe.ufs.sh',
        pathname: '/f/*'
      }
    ]
  } // TODO for now, lorem ipsum images
};

export default nextConfig;
