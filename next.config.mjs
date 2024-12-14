/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'www.google.com'
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            },
            {
                protocol: 'http',
                hostname: 'res.cloudinary.com'
            },
            {
                protocol: 'https',
                hostname: 'api.qrserver.com'
            }
        ]
    }
};

export default nextConfig;
