import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'

import BlogPostCard from '../components/BlogPostCard'
import DataVizPostCard from '../components/DataVizPostCard'
import Layout from '../components/Layout'

const IndexPage = ({
  data: {
    postsAllMarkdownRemark: { edges: posts },
    datavizAllMarkdownRemark: { edges: dataviz },
    markdownRemark: { title, description },
  },
}) => (
    <Layout>
      <GatsbySeo
        title={title}
        description={description}
      />

      <section className="max-w-3xl mx-auto px-2 sm:px-4 xl:max-w-5xl xl:px-0 mb-8">
        <h1 className="text-3xl leading-9 text-gray-800 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 mb-2">Data Show</h1>
      </section>

      {posts.length > 0 && (
        <section className="max-w-3xl mx-auto px-2 sm:px-4 xl:max-w-5xl xl:px-0 mb-8">
          <h2 className="text-lg text-gray-900 mb-2">Latest</h2>

          <hr className="my-4" />

          <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(
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
      )}

      {dataviz.length > 0 && (
        <section className="max-w-3xl mx-auto px-2 sm:px-4 xl:max-w-5xl xl:px-0 mb-8">
          <h2 className="text-lg text-gray-900 mb-2">Latest DataViz</h2>

          <hr className="my-4" />

          <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {dataviz.map(
              ({
                node: {
                  fields: { slug },
                  frontmatter: { title, media },
                },
              }) => (
                  <DataVizPostCard
                    className="mx-4"
                    key={slug}
                    slug={slug}
                    title={title}
                    image={media}
                  />
                )
            )}
          </div>
        </section>
      )}
    </Layout>
  )

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
    postsAllMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf({
        node: PropTypes.shape({
          frontmatter: PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
          }),
        }),
      }),
    }),
    datavizAllMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf({
        node: PropTypes.shape({
          frontmatter: PropTypes.shape({
            title: PropTypes.string
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
    postsAllMarkdownRemark: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: 0
      limit: 3
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            featuredimage {
              childImageSharp {
                fluid(maxHeight: 450) {
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
    datavizAllMarkdownRemark: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: 0
      limit: 3
      filter: { frontmatter: { templateKey: { eq: "dataviz-post" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            media {
              childImageSharp {
                fluid(maxHeight: 450) {
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
