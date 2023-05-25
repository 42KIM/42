const exclude = [
  '/dynamic-sitemap.xml',
  '/posts/*',
];

const siteUrl = process.env.PRODUCTION_URL || 'https://42blog.vercel.app';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  changefreq: false,
  generateIndexSitemap: false,
  exclude,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: exclude,
      }
    ],
    additionalSitemaps: [ `${siteUrl}/dynamic-sitemap.xml` ]
  },
};
