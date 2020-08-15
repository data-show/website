import { format } from 'date-fns'
import { graphql, Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import Img from 'gatsby-image'
import { kebabCase } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  publishedDate,
  author,
  sources,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <article className="section">
      {helmet || ''}
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
  author: PropTypes.shape,
  sources: PropTypes.array,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { post, category, author } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />

            <meta property="og:title" content={post.frontmatter.title} />
            <meta property="og:description" content={post.frontmatter.description} />
            <meta property="og:url" content={post.fields.slug} />
            <meta property="og:type" content="article" />
            <meta property="article:published_time" content={post.frontmatter.date} />
            <meta property="article:modified_time" content={post.frontmatter.date} />
            <meta property="article:author" content={author.fields.slug} />
            <meta property="article:section" content={category.frontmatter.title} />
            {post.frontmatter.tags.map(tag => (
              <meta property="article:tag" content={tag} />
            ))}
            <meta property="og:image" content={post.frontmatter.featuredimage.childImageSharp.fluid.src} />

            <meta name="twitter:title" content={post.frontmatter.title} />
            <meta name="twitter:description" content={post.frontmatter.description} />
            <meta name="twitter:image" content={post.frontmatter.featuredimage.childImageSharp.fluid.src} />

            <script type="application/ld+json">
              {`
                {
                  "@context": "http://schema.org",
                  "@type": "BlogPosting",
                  "name": "${post.frontmatter.title}",
                  "headline": "${post.frontmatter.title}",
                  "datePublished": "${post.frontmatter.date}",
                  "dateModified": "${post.frontmatter.date}",
                  "author": {
                    "@type": "Person",
                    "name": "${author.frontmatter.name}",
                    "url": "${author.fields.slug}"
                  },
                  "image": "${post.frontmatter.featuredimage.childImageSharp.fluid.src}",
                  "url": "${post.fields.slug}",
                  "description": "${post.frontmatter.description}"
                }
              `}
            </script>
          </Helmet>
        }
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
