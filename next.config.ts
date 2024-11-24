import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: "/dashboard/academic/courses/:courseId/:singlePath",
                destination: "/dashboard/academic/courses/:courseId?view=:singlePath",
                permanent: true,
            },
            {
                source: "/dashboard/academic",
                destination: "/dashboard/academic/courses",
                permanent: true,
            },
        ];
    },
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
