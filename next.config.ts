import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "globalrecruitment-s3.s3.ap-southeast-1.amazonaws.com",
			},
		],
	},

	/* config options here */
	// eslint: {
	// 	// Warning: This allows production builds to successfully complete even if
	// 	// your project has ESLint errors.
	// },
	// ignoreDuringBuilds: true,
};

export default nextConfig;
