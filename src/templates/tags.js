import { graphql, Link } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React from 'react'

import BlogPostCard from '../components/BlogPostCard/BlogPostCard'
import Layout from '../components/Layout'

const TagRoute = ({
  data: {
    allMarkdownRemark: { edges: posts, totalCount }
  },
  pageContext: { tag, slug: tagSlug },
  site: { siteMetadata: { siteUrl } }
}) => {
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
    } tagged with “${tag}”`

  return (
    <Layout>
      <GatsbySeo
        title={tag}
        canonical={`${siteUrl}${tagSlug}`}
      />
      <section className="max-w-3xl mx-auto px-2 sm:px-4 xl:max-w-5xl xl:px-0">
        <section>
          <div className="space-y-4 text-left py-2 mb-6 lg:mb-8">
            <h1 className="text-2xl leading-9 text-gray-800 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 mb-2">
              {tag}
            </h1>
            <p className="text-lg text-gray-600 tracking-tight sm:text-lg md:text-xl md:leading-8 mb-4">
              {tagHeader}
            </p>
          </div>
        </section>

        <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((
            {
              node: {
                fields: { slug },
                frontmatter: { title, description, featuredimage },
              },
            }
          ) => (
              <BlogPostCard
                className="mx-4"
                key={slug}
                slug={slug}
                title={title}
                description={description}
                image={featuredimage}
              />
            ))}
        </div>

        <div className="mt-2">
          <Link to={`/tags/`}>Browse all tags</Link>
        </div>
      </section>
    </Layout>
  )
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
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
