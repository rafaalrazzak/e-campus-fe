import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "cdn.kita.blue",
            },
        ],
    },
};

export default nextConfig;
