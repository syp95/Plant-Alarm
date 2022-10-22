/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({ dest: 'public' });

module.exports = withPWA({
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
});
