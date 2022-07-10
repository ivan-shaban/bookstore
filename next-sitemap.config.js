/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_BASE_PATH || 'INSERT_YOUR_WEBSITE_URL',
    generateRobotsTxt: true,
}
