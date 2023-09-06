const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/rss',
        destination: '/feed.xml',
      },
      {
        source: '/rss.xml',
        destination: '/feed.xml',
      },
      {
        source: '/feed',
        destination: '/feed.xml',
      },
    ]
  },
  images: {
    remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
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
