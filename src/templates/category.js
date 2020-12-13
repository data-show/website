import { graphql, Link } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { kebabCase, uniq } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import Content, { HTMLContent } from '../components/Content'
import BlogPostCard from '../components/BlogPostCard/BlogPostCard'
import Layout from '../components/Layout'

export const CategoryTemplate = ({
  content,
  contentComponent,
  description,
  title,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section>
      <div className="space-y-4 text-left py-2 mb-6 lg:mb-8">
        <h1 className="text-3xl leading-9 text-gray-800 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 mb-2">
          {title}
        </h1>
        <p className="text-lg text-gray-600 sm:text-lg md:text-xl md:leading-8 mb-4">
          {description}
        </p>
      </div>

      <PostContent className="prose prose-lg" content={content} />
    </section>
  )
}

CategoryTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string
}

const Category = ({
  data: {
    markdownRemark: category,
    tagsMarkdownRemark: { edges: tagsEdges },
    allMarkdownRemark: { edges: postEdges },
    site: { siteMetadata: { siteUrl } }
  },
}) => {
  const tags = uniq(tagsEdges.reduce((acc, { node: { frontmatter: { tags } } }) => acc.concat(tags), []))

  return (
    <Layout>
      <GatsbySeo
        title={`${category.frontmatter.title} dataviz and data articles`}
        description={category.frontmatter.description}
        canonical={`${siteUrl}${category.fields.slug}`}
      />

      <section className="max-w-3xl mx-auto px-2 sm:px-4 xl:max-w-5xl xl:px-0">
        <CategoryTemplate
          content={category.html}
          contentComponent={HTMLContent}
          description={category.frontmatter.description}
          title={category.frontmatter.title}
        />

        <div className="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
          <h2 className="font-bold text-3xl">Latest</h2>
        </div>
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {postEdges.map(
            ({
              node: {
                fields: { slug },
                frontmatter: { title, description, featuredimage },
              },
            }) => (
                <BlogPostCard
                  className="mx-4"
                  key={slug}
                  slug={slug}
                  title={title}
                  description={description}
                  image={featuredimage}
                />
              )
          )}
        </div>

        <div className="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
          <h2 className="font-bold text-3xl">Discover more tags</h2>
        </div>
        {tags && tags.length ? (
          <div className="py-2 my-1 md:my-2">
            {tags.map(tag => (
              <Link
                key={tag + `tag`}
                to={`/tags/${kebabCase(tag)}/`}
                className="inline-block bg-gray-200 px-4 py-2 text-sm text-gray-700 mr-2 mb-2"
              >
                {tag}
              </Link>
            ))}
          </div>
        ) : null}
      </section>
    </Layout>
  )
}

Category.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
    allMarkdownRemark: PropTypes.object,
    site: PropTypes.object
  }),
}

export default Category

export const pageQuery = graphql`
  query CategoryByID($id: String!, $title: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: 0
      limit: 10
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          category: { eq: $title }
        }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            featuredimage {
              childImageSharp {
                fluid(maxHeight: 350) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
    tagsMarkdownRemark: allMarkdownRemark(
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          category: { eq: $title }
        }
      }
    ) {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
