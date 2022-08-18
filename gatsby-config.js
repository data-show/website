const netlifyCmsPaths = {
  resolve: 'gatsby-plugin-netlify-cms-paths',
  options: {
    cmsConfig: '/static/admin/config.yml',
  },
}

const siteUrl = 'https://www.data-show.com/'
const title = 'Data Show'
const description =
  'Data Show makes data visualization notebooks with open data about economics and health topics.'
const logo = '/img/logo.png'
const srcLogo = 'src/images/logo.png'
const color = '#433e85'
const social = {
  twitter: 'DataShow_',
  instagram: 'datashow_',
  youtube: 'UC1siUJqeSI3Zoyj02tw1jgA',
  github: 'data-show',
  linkedin: 'data-show-blog',
}
const gtagId = 'G-7JKYHNXE4G'
const mailchimpEndpoint =
  'https://data-show.us1.list-manage.com/subscribe/post?u=68dc700424036ced77e68077d&amp;id=ef2464c33c'

module.exports = {
  siteMetadata: {
    siteUrl,
    logo,
    title,
    description,
    color,
    social,
  },
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
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
        path: `${__dirname}/src/images`,
        name: 'images',
      },
    },
    netlifyCmsPaths,
    `gatsby-plugin-image`,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          netlifyCmsPaths,
          'gatsby-remark-reading-time',
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              staticFolderName: 'static',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1024,

              linkImagesToOriginal: true,
              loading: 'lazy',
              showCaptions: true,
              disableBgImage: true,
              withWebp: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        enableIdentityWidget: false
      },
    },
    {
      resolve: 'gatsby-plugin-next-seo',
      options: {
        title,
        language: 'en',
        description,
        canonical: siteUrl,
        openGraph: {
          type: 'website',
          locale: 'en_US',
          url: siteUrl,
          description,
          title,
          site_name: title,
        },
        twitter: {
          site: social.twitter,
          cardType: 'summary_large_image',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: mailchimpEndpoint,
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
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
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
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [gtagId],
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
        icon: srcLogo,
        // cache_busting_mode: 'none'
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {},
        allPageHeaders: ['Cache-Control: public, s-maxage=604800'],
        mergeSecurityHeaders: true,
        mergeCachingHeaders: true,
        generateMatchPathRewrites: true,
        transformHeaders: (headers, path) => {
          const regex = /Cache-Control:(?:.*, )max-age=([0-9]+)(?:.*)/

          return headers.map(header =>
            typeof header === 'string' && regex.test(header)
              ? `${header}, s-maxage=${header.match(regex)[1]}`
              : header
          )
        },
      },
    },
  ],
}
