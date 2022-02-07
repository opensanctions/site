module.exports = {
  trailingSlash: true,
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