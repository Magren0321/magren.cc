const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s3.us-west-2.amazonaws.com'],
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    appDir: true,
    mdxRs: true,
  },
  reactStrictMode: true,
  dangerouslySetWebpackConfig: (config) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: 'raw-loader',
          options: {
            esModule: false,
          },
        },
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [],
          },
        },
      ],
    })
  }
};

module.exports = withMDX(nextConfig);
