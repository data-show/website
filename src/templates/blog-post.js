import { format } from 'date-fns'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { GatsbySeo, ArticleJsonLd } from 'gatsby-plugin-next-seo'
import { kebabCase } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import useSiteMetadata from '../queries/site-metadata'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  publishedDate,
  author,
  sources
}) => {
  const PostContent = contentComponent || Content

  return (
    <article className="section">
      <header className="content header">
        <h1>{title}</h1>

        <div className="pure-g">
          <div className="pure-u-1-2">
            <div className="pure-g">
              <div className="pure-u-1-5">
                <Img
                  fluid={author.frontmatter.image.childImageSharp.fluid}
                  alt={author.frontmatter.name}
                  className="pure-img"
                />
              </div>
              <div className="pure-u-4-5">
                <div className="pure-u-1-1">
                  <Link to={author.fields.slug}>{author.frontmatter.name}</Link>
                </div>
                <div className="pure-u-1-1">
                  {format(new Date(publishedDate), 'PP')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="content post-content">
        <PostContent content={content} />
        <div style={{ marginTop: `4rem` }}>
          <h4>Sources</h4>
          {sources && sources.length ? (
            <div className="pure-g">
              {sources.map(source => (
                <div className="pure-u-1-1">
                  <OutboundLink href={source.link} target="_blank" rel="noreferrer">{source.source}</OutboundLink>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {tags && tags.length ? (
          <div style={{ marginTop: `4rem` }}>
            <h4>Tags</h4>
            <span>
              {tags.map(tag => (
                <Link key={tag + `tag`} to={`/tags/${kebabCase(tag)}/`} className="post-tag">{tag}</Link>
              ))}
            </span>
          </div>
        ) : null}
      </div>
    </article>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  tags: PropTypes.array,
  title: PropTypes.string,
  publishedDate: PropTypes.string,
  author: PropTypes.object,
  sources: PropTypes.array,
}

const BlogPost = ({ data }) => {
  const { post, category, author } = data
  const { logo, siteUrl } = useSiteMetadata()

  return (
    <Layout>
      <GatsbySeo
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        canonical={`${siteUrl}${post.fields.slug}`}
        openGraph={{
          title: post.frontmatter.title,
          description: post.frontmatter.description,
          url: `${siteUrl}${post.fields.slug}`,
          type: 'article',
          article: {
            publishedTime: post.frontmatter.date,
            modifiedTime: post.frontmatter.date,
            section: category.frontmatter.title,
            authors: [
              `${siteUrl}${author.frontmatter.slug}`
            ],
            tags: post.frontmatter.tags,
          },
          images: [
            post.frontmatter.featuredimage.childImageSharp.fluid.src
          ],
        }}
      />
      <ArticleJsonLd
        url={`${siteUrl}${post.fields.slug}`}
        headline={post.frontmatter.title}
        images={[
          post.frontmatter.featuredimage.childImageSharp.fluid.src
        ]}
        datePublished={post.frontmatter.date}
        dateModified={post.frontmatter.date}
        authorName={author.frontmatter.name}
        publisherLogo={logo.childImageSharp.fluid.src}
        description={post.frontmatter.description}
        overrides={{
          '@type': 'BlogPosting',
        }}
      />
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        publishedDate={post.frontmatter.date}
        author={author}
        sources={post.frontmatter.sources}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!, $category: String!, $author: String!) {
    post: markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date
        language
        featuredimage {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        title
        description
        tags
        sources {
          link
          source
        }
      }
    }
    category: markdownRemark(frontmatter: { title: { eq: $category } }) {
      id
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    author: markdownRemark(frontmatter: { github: { eq: $author } }) {
      id
      fields {
        slug
      }
      frontmatter {
        name
        image {
          childImageSharp {
            fluid(maxWidth: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    sources: markdownRemark(frontmatter: { github: { eq: $author } }) {
      id
      fields {
        slug
      }
      frontmatter {
        name
        image {
          childImageSharp {
            fluid(maxHeight: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
