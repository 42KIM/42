const exclude = [
  '/posts/create',
  '/posts/edit',
];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.PRODUCTION_URL || 'https://42blog.vercel.app',
  changefreq: false,
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: exclude,
      }
    ]
  },
  exclude,
};
