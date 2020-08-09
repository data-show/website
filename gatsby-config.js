const netlifyCmsPaths = {
  resolve: 'gatsby-plugin-netlify-cms-paths',
  options: {
    cmsConfig: '/static/admin/config.yml',
  },
}

const title = 'Data Show'
const logo = '/static/img/logo.png'
const color = '#433e85'

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.data-show.com/',
    logo,
    title,
    description:
      'Data Show makes data visualization notebooks with open data about economics and health topics.',
    color,
    social: {
      twitter: 'DataShow_',
      instagram: 'datashow_',
      youtube: 'UC1siUJqeSI3Zoyj02tw1jgA',
      github: 'data-show',
      linkedin: 'data-show-blog'
    }
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    netlifyCmsPaths,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          netlifyCmsPaths,
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 890,
              linkImagesToOriginal: false,
              withWebp: true,
              srcSetBreakpoints: [200, 340, 520, 890],
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          'gatsby-remark-smartypants'
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        develop: true,
        purgeOnly: ['/all.scss'],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign(
                  {},
                  edge.node.frontmatter,
                  {
                    description: edge.node.frontmatter.description,
                    date: edge.node.frontmatter.date,
                    url:
                      site.siteMetadata.siteUrl +
                      edge.node.fields.slug,
                    guid:
                      site.siteMetadata.siteUrl +
                      edge.node.fields.slug,
                    custom_elements: [
                      { 'content:encoded': edge.node.html },
                    ],
                  },
                )
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] }
                  filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
                ) {
                  edges {
                    node {
                      html
                      fields { slug }
                      frontmatter {
                        title
                        description
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Data Show RSS Feed',
          },
        ],
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-162035849-1',
        head: false,
        anonymize: true,
        respectDNT: true
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: title,
        short_name: title,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: color,
        display: `minimal-ui`,
        icon: 'src/img/logo.png',
      },
    },
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-netlify-cache',
      options: {
        cachePublic: true,
      },
    },
  ],
}
