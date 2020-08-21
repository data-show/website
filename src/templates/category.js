import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

import Content, { HTMLContent } from '../components/Content'
import BlogPostCard from '../components/BlogPostCard/BlogPostCard'
import Layout from '../components/Layout'

export const CategoryTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section>
      {helmet || ''}
      <div className="space-y-4 text-left py-2 mb-6 lg:mb-8">
        <h1 className="text-3xl leading-9 text-gray-800 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 mb-2">{title}</h1>
        <p className="text-lg text-gray-600 tracking-tight sm:text-lg md:text-xl md:leading-8 mb-4">{description}</p>
      </div>

      <PostContent content={content} />
    </section>
  )
}

CategoryTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const Category = ({
  data: {
    markdownRemark: category,
    allMarkdownRemark: { edges: postEdges },
  },
}) => (
    <Layout>
      <section className="max-w-3xl mx-auto px-2 sm:px-4 xl:max-w-5xl xl:px-0">
        <CategoryTemplate
          content={category.html}
          contentComponent={HTMLContent}
          description={category.frontmatter.description}
          helmet={
            <Helmet titleTemplate="%s">
              <title>{`${category.frontmatter.title}`}</title>
              <meta
                name="description"
                content={`${category.frontmatter.description}`}
              />
            </Helmet>
          }
          title={category.frontmatter.title}
        />

        <h2 className="text-lg text-gray-900 mb-2">Latest</h2>

        <hr className="my-4" />

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
      </section>
    </Layout>
  )

Category.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Category

export const pageQuery = graphql`
  query CategoryByID($id: String!, $title: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
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
                fluid(maxWidth: 450) {
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
  }
`
