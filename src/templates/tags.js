import { graphql, Link } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React from 'react'

import BlogPostCard from '../components/BlogPostCard'
import DataVizPostCard from '../components/DataVizPostCard'
import Layout from '../components/Layout'

const TagRoute = ({
  data: {
    allMarkdownRemark: { totalCount },
    postsAllMarkdownRemark: { edges: posts },
    datavizAllMarkdownRemark: { edges: dataviz },
    site: { siteMetadata: { siteUrl } }
  },
  pageContext: { tag, slug: tagSlug }
}) => {
  const title = tag
  const seoTitle = `Dataviz posts and articles about ${tag}`
  const description = `Find some dataviz and articles with data about ${title}`
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
    } tagged with “${tag}”`

  return (
    <Layout>
      <GatsbySeo
        title={seoTitle}
        description={description}
        canonical={`${siteUrl}${tagSlug}`}
      />
      <section className="max-w-3xl mx-auto px-2 sm:px-4 xl:max-w-5xl xl:px-0">
        <section>
          <div className="space-y-4 text-left py-2 mb-6 lg:mb-8">
            <h1 className="text-2xl leading-9 text-gray-800 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 mb-2">
              {title}
            </h1>
            <p className="text-lg text-gray-600 tracking-tight sm:text-lg md:text-xl md:leading-8 mb-4">
              {tagHeader}
            </p>
          </div>
        </section>

        {posts.length > 0 && (
          <div className="mb-8">
            <div className="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
              <h2 className="font-bold text-3xl">Blog Posts</h2>
            </div>

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
          </div>
        )}

        {dataviz.length > 0 && (
          <div className="mb-8">
            <div className="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
              <h2 className="font-bold text-3xl">DataViz Posts</h2>
            </div>
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {dataviz.map((
                {
                  node: {
                    fields: { slug },
                    frontmatter: { title, media },
                  },
                }
              ) => (
                  <DataVizPostCard
                    className="mx-4"
                    key={slug}
                    slug={slug}
                    title={title}
                    image={media}
                  />
                ))}
            </div>
          </div>
        )}

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
    }
    postsAllMarkdownRemark: allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "blog-post" }, tags: { in: [$tag] } } }
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
                fluid(maxHeight: 350) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    datavizAllMarkdownRemark: allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "dataviz-post" }, tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
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
