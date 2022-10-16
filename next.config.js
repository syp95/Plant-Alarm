/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['localhost', '*'],
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
