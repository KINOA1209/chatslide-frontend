/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects(){
		return [
			{
				source: '/workflow-generate-outlines',
				destination: '/summary',
				permanent: true,
			},
			{
				source: '/workflow-generate-socialpost',
				destination: '/summary-socialpost',
				permanent: true,
			},
			{
				source: '/workflow-edit-outlines',
				destination: '/outlines',
				permanent: true,
			},
			{
				source: '/workflow-edit-design',
				destination: '/design',
				permanent: true,
			},
			{
				source: '/workflow-review-slides',
				destination: '/slides',
				permanent: true,
			},
			{
				source: '/workflow-review-socialpost',
				destination: '/socialpost',
				permanent: true,
			},
			{
				source: '/workflow-edit-scripts',
				destination: '/scripts',
				permanent: true,
			},
			{
				source: '/workflow-review-video',
				destination: '/video',
				permanent: true,
			},
			{
				source: '/workflow-type-choice',
				destination: '/type-choice',
				permanent: true,
			},
			{
				source: '/workflow-scenario-choice',
				destination: '/scenario-choice',
				permanent: true,
			},
			{
				source: '/workflow-generationMode-choice',
				destination: '/genmode',
				permanent: true,
			},
			{
				source: '/meet',
				destination: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3Ly0YZMnlcouxHwvv7cUsVLziVxNPfqNBoDl8H9D9ob6sn9-WMDg7Uu0ZTPzUlKjXFjmMBeJGS',
				permanent: true,
			},
			{
				source: '/discord',
				destination: 'https://discord.com/invite/GypUrQ4X',
				permanent: true,
			}
		]
	},

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
		// Allowed image domains
		domains: ['localhost', 'img.freepik.com'],
		// Optionally allow all hostnames
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},


};

module.exports = nextConfig;
