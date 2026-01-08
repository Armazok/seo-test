export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/private/',
            },
        ],
        sitemap: 'https://seo-test-ivory.vercel.app/sitemap.xml',
    }
}
