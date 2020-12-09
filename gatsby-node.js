const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const webpack = require(`webpack`)

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const edgesPerPage = 15

  const createTemplatePage = (node, pagePath, pageContext = {}) => {
    const context = {
      id: node.id,
      title: node.frontmatter.title || node.frontmatter.github,
      ...pageContext
    }

    if (node.frontmatter.category) {
      context.category = node.frontmatter.category
    }

    if (node.frontmatter.author) {
      context.author = node.frontmatter.author
    }

    if (
      node.frontmatter.sources &&
      node.frontmatter.sources.length > 0
    ) {
      context.sources = node.frontmatter.sources.map(
        ({ source }) => source
      )
    }

    createPage({
      path: pagePath,
      tags: node.frontmatter.tags,
      component: path.resolve(
        `src/templates/${String(node.frontmatter.templateKey)}.js`
      ),
      context,
    })
  }

  return graphql(`
    {
      posts: allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              tags
              author
              category
              sources {
                source
              }
              templateKey
            }
          }
        }
      }
      dataviz: allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { templateKey: { eq: "dataviz-post" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              tags
              author
              category
              sources {
                source
              }
              templateKey
            }
          }
        }
      }
      categories: allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "category" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
            }
          }
        }
      }
      authors: allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "author" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              name
              github
              templateKey
            }
          }
        }
      }
      sources: allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "source" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              name
              templateKey
            }
          }
        }
      }
      others: allMarkdownRemark(
        filter: {
          frontmatter: {
            templateKey: { nin: ["blog-post", "dataviz-post", "category", "author", "source"] }
          }
        }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              name
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const postsEdges = result.data.posts.edges
    postsEdges.forEach(({ node }, index) => {
      const previous = index === postsEdges.length - 1 ? null : postsEdges[index + 1].node.id
      const next = index === 0 ? null : postsEdges[index - 1].node.id

      createTemplatePage(node, node.fields.slug, { previous, next })
    })

    const datavizEdges = result.data.dataviz.edges
    datavizEdges.forEach(({ node }, index) => {
      const previous = index === datavizEdges.length - 1 ? null : datavizEdges[index + 1].node.id
      const next = index === 0 ? null : datavizEdges[index - 1].node.id

      createTemplatePage(node, node.fields.slug, { previous, next })
    })

    let tags = []
    postsEdges.concat(datavizEdges).forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    tags = _.uniq(tags)

    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`
      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
          slug: tagPath
        },
      })
    })

    const categoriesEdges = result.data.categories.edges
    categoriesEdges.forEach(({ node }) => {
      const numPages = Math.ceil(postsEdges.filter(e => e.node.frontmatter.category === node.frontmatter.title).length / edgesPerPage)

      Array.from({ length: numPages }).forEach((_, index) => {
        const context = {
          limit: edgesPerPage,
          skip: index * edgesPerPage,
          numPages,
          currentPage: index + 1
        }

        createTemplatePage(node, `${node.fields.slug}${index === 0 ? `` : `page/${index + 1}`}`, context)
      })
    })

    const authorsEdges = result.data.authors.edges
    authorsEdges.forEach(({ node }) => {
      const numPages = Math.ceil(postsEdges.filter(e => e.node.frontmatter.author === node.frontmatter.github).length / edgesPerPage)

      Array.from({ length: numPages }).forEach((_, index) => {
        const context = {
          limit: edgesPerPage,
          skip: index * edgesPerPage,
          numPages,
          currentPage: index + 1
        }

        createTemplatePage(node, `${node.fields.slug}${index === 0 ? `` : `page/${index + 1}`}`, context)
      })
    })

    const sourcesEdges = result.data.sources.edges
    sourcesEdges.forEach(({ node }) => {
      const sourcePosts = postsEdges
        .reduce((acc, e) => acc.concat(e.node.frontmatter.sources.map(s => ([e.node.id, s.source]))), [])
        .filter(([, s]) => s === node.frontmatter.name)
        .filter(([id], i, self) =>
          self.findIndex(([selfId]) => selfId === id) === i
        )
      const numPages = Math.ceil(sourcePosts.length / edgesPerPage)

      Array.from({ length: numPages }).forEach((_, index) => {
        const context = {
          limit: edgesPerPage,
          skip: index * edgesPerPage,
          numPages,
          currentPage: index + 1
        }

        createTemplatePage(node, `${node.fields.slug}${index === 0 ? `` : `page/${index + 1}`}`, context)
      })
    })

    const othersEdges = result.data.others.edges
    othersEdges.forEach(({ node }) => {
      createTemplatePage(node, node.fields.slug)
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^netlify-identity-widget$/,
      }),
    ],
  })
}
