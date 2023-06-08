const dynamicGeneration = [
  '/dynamic-sitemap.xml',
  '/posts/*',
];

const privateRoutes = [
  '/posts/create',
  '/posts/edit',
];

const siteUrl = process.env.PRODUCTION_URL || 'https://42blog.vercel.app';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  changefreq: false,
  autoLastmod: false,
  generateIndexSitemap: false,
  exclude: dynamicGeneration,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: privateRoutes,
      }
    ],
    additionalSitemaps: [ `${siteUrl}/dynamic-sitemap.xml` ]
  },
};
