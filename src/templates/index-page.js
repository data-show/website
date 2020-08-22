import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'

import BlogPostCard from '../components/BlogPostCard/BlogPostCard'
import Layout from '../components/Layout'

const IndexPage = ({
  data: {
    allMarkdownRemark,
    markdownRemark: { title, description },
  },
}) => (
  <Layout>
    <GatsbySeo title={title} description={description} />

    <section className="max-w-3xl mx-auto px-2 sm:px-4 xl:max-w-5xl xl:px-0">
      <h2 className="text-lg text-gray-900 mb-2">Latest</h2>

      <hr className="my-4" />

      <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {allMarkdownRemark.edges.map(
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

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf({
        node: PropTypes.shape({
          frontmatter: PropTypes.shape({
            title: PropTypes.string,
          }),
        }),
      }),
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: 0
      limit: 10
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
