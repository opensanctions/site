/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['react-bootstrap']
  },
  trailingSlash: true,
  images: {
    domains: ['assets.pudo.org'],
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