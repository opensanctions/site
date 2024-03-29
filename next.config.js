const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true,
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
      {
        source: '/docs/usage/',
        destination: '/docs/',
        permanent: false,
      },
      {
        source: '/docs/commercial-faq/',
        destination: '/docs/commercial/faq/',
        permanent: false,
      },
      {
        source: '/docs/api/',
        destination: '/api/',
        permanent: false,
      },
      {
        source: '/entities/',
        destination: '/research/',
        permanent: false,
      },
      {
        source: '/blog/',
        destination: '/articles/',
        permanent: false,
      },
      {
        source: '/recent/:page',
        destination: '/datasets/:page',
        permanent: false,
      },
      {
        source: '/datasets/offshoreleaks/',
        destination: '/datasets/icij_offshoreleaks/',
        permanent: false,
      },
      {
        source: '/slack/',
        destination: 'https://join.slack.com/t/opensanctions/shared_invite/zt-xwnzvht1-9jPnHUwfCzW_Yw9MAG6vTA',
        permanent: false,
      },
      {
        source: '/meeting/',
        // destination: 'https://calendly.com/flindenberg/30min',
        destination: 'https://meetings-eu1.hubspot.com/douglas-arellanes',
        permanent: false,
      },
      {
        source: '/frederik/',
        destination: 'https://meetings-eu1.hubspot.com/frederik-richter',
        permanent: false,
      },
      {
        source: '/docs/opensource/install/',
        destination: 'https://zavod.opensanctions.org/install/',
        permanent: false,
      },
      {
        source: '/docs/opensource/crawlers/',
        destination: 'https://zavod.opensanctions.org/tutorial/',
        permanent: false,
      },
    ]
  },
};

module.exports = nextConfig