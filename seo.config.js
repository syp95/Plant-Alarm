export default {
    titleTemplate: '%s | Example',
    additionalLinkTags: [
        {
            rel: 'icon',
            href: '/favicon.ico',
        },
        {
            rel: 'manifest',
            href: '/manifest.json',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/icons/180icon.png',
        },
    ],
    additionalMetaTags: [
        {
            name: 'application-name',
            content: 'plantalarm',
        },
        // iOS
        {
            name: 'apple-mobile-web-app-title',
            content: 'plantalarm',
        },
        {
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
        },
        {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'default',
        },
        {
            name: 'format-detection',
            content: 'telephone:no',
        },
        // Android
        {
            name: 'mobile-web-app-capable',
            content: 'yes',
        },
        {
            name: 'theme-color',
            content: '#FFFFFF',
        },
    ],
    openGraph: {
        type: 'website',
        site_name: 'Example',
        images: [{ url: 'https://example.com/example_square_image.png' }],
    },
};
