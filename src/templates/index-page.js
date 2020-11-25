import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { GatsbySeo } from 'gatsby-plugin-next-seo'

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

      {posts.length > 0 && (
        <div className="flex flex-wrap md:flex-no-wrap space-x-0 md:space-x-6 mb-16">
          <div className="mb-4 lg:mb-0  p-4 lg:p-0 w-full md:w-4/7 relative rounded block">
            <Link to={posts[0].node.fields.slug}>
              <Img
                fluid={posts[0].node.frontmatter.featuredimage.childImageSharp.fluid}
                fadeIn={false}
                loading="eager"
                alt={posts[0].node.frontmatter.title}
                title={posts[0].node.frontmatter.title}
                className="rounded-md object-cover w-full h-64"
              />
            </Link>
            <span className="text-gray-700 text-sm hidden md:block mt-4">{posts[0].node.frontmatter.category}</span>
            <Link to={posts[0].node.fields.slug}>
              <h2 className="text-gray-800 text-4xl font-bold mt-2 mb-2 leading-tight">
                {posts[0].node.frontmatter.title}
              </h2>
            </Link>
            <p className="text-gray-600 mb-4">
              {posts[0].node.frontmatter.description}
            </p>
            <Link to={posts[0].node.fields.slug} className="inline-block px-6 py-3 mt-2 rounded-md bg-gray-700 text-gray-100">
              Read more
            </Link>
          </div>

          <div className="w-full md:w-4/7">
            {posts.slice(1, 5).map(
              ({
                node: {
                  fields: { slug },
                  frontmatter: { category, title, description, featuredimage },
                },
              }) => (
                  <div key={slug} className="rounded w-full flex flex-col md:flex-row mb-10">
                    <Link to={slug}>
                      <Img
                        fluid={featuredimage.childImageSharp.fluid}
                        alt={title}
                        title={title}
                        className="block lg:block rounded-md w-64 h-64 md:w-56 md:h-32 m-4 md:m-0"
                      />
                    </Link>
                    <div className="bg-white rounded px-4">
                      <span className="text-gray-700 text-sm hidden md:block">{category}</span>
                      <Link to={slug}>
                        <h3 className="md:mt-0 text-gray-800 font-semibold text-xl mb-2">
                          {title}
                        </h3>
                      </Link>
                      <p className="block md:hidden p-2 pl-0 pt-1 text-sm text-gray-600">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      )}

      {dataviz.length > 0 && (
        <section>
          <div className="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
            <h2 className="font-bold text-3xl">Latest DataViz</h2>
            <Link to={`/dataviz`} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded cursor-pointer">
              View all
            </Link>
          </div>
          <div className="block space-x-0 lg:flex lg:space-x-6">
            {dataviz.map(
              ({
                node: {
                  fields: { slug },
                  frontmatter: { title, media },
                },
              }) => (
                  <DataVizPostCard
                    className="lg:w-1/2 lg:w-1/3 p-4 lg:p-0"
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
      limit: 5
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            featuredimage {
              childImageSharp {
                fluid(maxHeight: 550) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            category
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
  }
`
