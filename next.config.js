/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },
    async rewrites() {
        return [
            {
                source: '/plantapi/api/:path*',
                destination: `http://localhost:3001/api/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
