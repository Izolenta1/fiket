import type { NextConfig } from "next";

const imageHosts = (process.env.NEXT_PUBLIC_IMAGE_HOSTS ?? "s3.example.com")
	.split(",")
	.map((hostname) => hostname.trim())
	.filter(Boolean);

const nextConfig: NextConfig = {
	reactCompiler: true,
	images: {
		remotePatterns: imageHosts.map((hostname) => ({
			protocol: "https" as const,
			hostname,
		})),
	},
	output: "standalone"
};

export default nextConfig;
