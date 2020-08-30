const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const createTemplatePages = edges => {
    edges.forEach(edge => {
      const context = {
        id: edge.node.id,
        title: edge.node.frontmatter.title,
      }

      if (edge.node.frontmatter.category) {
        context.category = edge.node.frontmatter.category
      }

      if (edge.node.frontmatter.author) {
        context.author = edge.node.frontmatter.author
      }

      if (
        edge.node.frontmatter.sources &&
        edge.node.frontmatter.sources.length > 0
      ) {
        context.sources = edge.node.frontmatter.sources.map(
          ({ source }) => source
        )
      }

      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        context,
      })
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
    createTemplatePages(postsEdges)

    const datavizEdges = result.data.dataviz.edges
    createTemplatePages(datavizEdges)

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
    createTemplatePages(categoriesEdges)

    const authorsEdges = result.data.authors.edges
    createTemplatePages(authorsEdges)

    const sourcesEdges = result.data.sources.edges
    createTemplatePages(sourcesEdges)

    const othersEdges = result.data.others.edges
    createTemplatePages(othersEdges)
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
