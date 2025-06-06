import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'amirandorm.com',
            port: '',
            pathname: '/**',
            search: '',
        },
        ],
    },
};

export default withMDX(nextConfig);
