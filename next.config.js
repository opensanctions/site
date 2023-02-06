/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['react-bootstrap']
  },
  staticPageGenerationTimeout: 360,
  trailingSlash: true,
  images: {
    domains: ['assets.pudo.org', 'assets.opensanctions.org'],
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