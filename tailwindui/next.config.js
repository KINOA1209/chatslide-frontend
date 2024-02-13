/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: 'export',
	webpack(config) {
		// Grab the existing rule that handles SVG imports
		const fileLoaderRule = config.module.rules.find((rule) =>
			rule.test?.test?.('.svg'),
		);

		config.module.rules.push(
			// Reapply the existing rule, but only for svg imports ending in ?url
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			// Convert all other *.svg imports to React components
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				resourceQuery: { not: /url/ }, // exclude if *.svg?url
				use: ['@svgr/webpack'],
			},
		);

		// Modify the file loader rule to ignore *.svg, since we have it handled now.
		fileLoaderRule.exclude = /\.svg$/i;


		return config;
	},

	webpack: (config, { isServer, nextRuntime, webpack }) => {
		// Avoid AWS SDK Node.js require issue
		if (isServer && nextRuntime === 'nodejs')
			config.plugins.push(
				new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ }),
			);
		return config;
	},

	// Configuration for next/image to handle external images
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
};

module.exports = nextConfig;
