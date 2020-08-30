import { graphql, Link } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import Img from 'gatsby-image'
import React from 'react'

import Layout from '../../components/Layout'

const DataVizIndexPage = ({ data: { allMarkdownRemark, site: { siteMetadata: { siteUrl, title } } } }) => {
  const datavisualizations = allMarkdownRemark.edges

  return (
    <Layout>
      <GatsbySeo
        title={`DataViz | ${title}`}
        description={`List of dataViz`}
        canonical={`${siteUrl}dataviz`}
      />

      <section className="max-w-3xl mx-auto px-2 sm:px-4 xl:max-w-5xl xl:px-0">
        <div className="space-y-4 text-left py-2 mb-6 lg:mb-8">
          <h1 className="text-3xl leading-9 text-gray-800 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 mb-2">
            DataViz
          </h1>
        </div>

        <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {datavisualizations.map(({ node: { frontmatter: { title, media }, fields: { slug } } }) => (
            <Link to={slug}>
              <Img
                fluid={media.childImageSharp.fluid}
                alt={title}
                title={title}
                className="w-full"
              />
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default DataVizIndexPage

export const pageQuery = graphql`
  query PaginatedDataViz {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: 0
      limit: 10
      filter: { frontmatter: { templateKey: { eq: "dataviz-post" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            media {
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
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
  }
`

