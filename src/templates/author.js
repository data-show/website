import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import PropTypes from 'prop-types'
import React from 'react'

import BlogPostCard from '../components/BlogPostCard/BlogPostCard'
import Layout from '../components/Layout'

const Author = ({ data: {
  markdownRemark: author,
  allMarkdownRemark: { edges: postEdges },
  site: { siteUrl }
} }) => (
    <Layout>
      <GatsbySeo
        title={author.frontmatter.name}
        description={author.frontmatter.description}
        canonical={`${siteUrl}${author.fields.slug}`}
        openGraph={{
          title: author.frontmatter.name,
          description: author.frontmatter.description,
          url: `${siteUrl}${author.fields.slug}`,
          type: 'profile',
          profile: {
            username: author.frontmatter.username,
          },
          images: [author.frontmatter.image.childImageSharp.fluid.src],
        }}
      />

      <section className="max-w-3xl mx-auto px-2 sm:px-4 xl:max-w-5xl xl:px-0">
        <section>
          <div className="space-y-4 text-left py-2 mb-6 lg:mb-8">
            <div className="grid grid-cols-6 gap-2 py-2">
              <div className="col-span-6 md:col-span-4 flex">
                <div>
                  <h1 className="text-3xl leading-9 text-gray-800 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 mb-2">
                    {author.frontmatter.name}
                  </h1>
                  <p className="text-lg text-gray-600 prose lg:prose-lg md:leading-8 mb-4">
                    {author.frontmatter.description}
                  </p>
                  <div className="flex justify-start items-center text-lg text-gray-500">
                    {author.frontmatter.website && (
                      <OutboundLink
                        className="block flex items-center hover:text-gray-700 mr-5"
                        href={author.frontmatter.website}
                        target="_blank"
                        rel="noopener nofollow"
                      >
                        {author.frontmatter.website}
                      </OutboundLink>
                    )}
                    {author.frontmatter.github && (
                      <OutboundLink
                        className="block flex items-center hover:text-gray-700 mr-5"
                        href={`https://github.com/${author.frontmatter.github}`}
                        target="_blank"
                        rel="noopener nofollow"
                      >
                        <FontAwesomeIcon icon={faGithub} />
                      </OutboundLink>
                    )}
                    {author.frontmatter.linkedin && (
                      <OutboundLink
                        className="block flex items-center hover:text-gray-700 mr-5"
                        href={author.frontmatter.linkedin}
                        target="_blank"
                        rel="noopener nofollow"
                      >
                        <FontAwesomeIcon icon={faLinkedin} />
                      </OutboundLink>
                    )}
                  </div>
                </div>
              </div>

              <Img
                fluid={author.frontmatter.image.childImageSharp.fluid}
                alt={author.frontmatter.name}
                className="rounded-full ml-4"
              />
            </div>

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
          </div>
        </section>
      </section>
    </Layout>
  )

Author.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Author

export const pageQuery = graphql`
  query AuthorByID($id: String!, $title: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        name
        description
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        username
        github
        linkedin
        website
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: 0
      limit: 10
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          author: { eq: $title }
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
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
