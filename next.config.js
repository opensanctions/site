module.exports = {
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
}