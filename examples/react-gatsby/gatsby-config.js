module.exports = {
  siteMetadata: {
    title: 'Stoplight Elements Gatsby Starter',
    description: 'A starter template to build beautiful developer docs using Stoplight Elements & Gatsby',
    author: '@stoplight',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'elements-starter-gatsby',
        short_name: 'elements',
        start_url: '/elements',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    }
  ],
};
