const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['react-bootstrap']
  },
  staticPageGenerationTimeout: 360,
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['assets.opensanctions.org'],
  },
  async redirects() {
    return [
      {
        source: '/sponsor/',
        destination: '/licensing/#sponsor',
        permanent: false,
      },
    ]
  },
};

module.exports = nextConfig