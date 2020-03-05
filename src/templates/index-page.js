import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import BlogPostCard from '../components/BlogPostCard'
import Layout from '../components/Layout'

const IndexPage = ({
  data: {
    allMarkdownRemark,
    markdownRemark: { title, description },
  },
}) => (
  <Layout>
    <Helmet titleTemplate="%s">
      <title>{`${title}`}</title>
      <meta name="description" content={`${description}`} />
    </Helmet>
    {allMarkdownRemark.edges.map(
      ({
        node: {
          fields: { slug },
          frontmatter: { title, description, image },
        },
      }) => (
        <BlogPostCard
          key={slug}
          slug={slug}
          title={title}
          description={description}
          image={image}
        />
      )
    )}
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
            featuredimage
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
