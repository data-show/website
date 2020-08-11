import { graphql, Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
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
  sources,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <article className="section">
      {helmet || ''}
      <header className="header">
        <h1>{title}</h1>
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
  sources: PropTypes.array,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  console.log(post)

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
            <meta property="article:author" content="/" />
            <meta property="article:section" content={post.frontmatter.category} />
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
                    "name": "${post.frontmatter.author}",
                    "url": "/"
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
  query BlogPostByID($id: String!) {
    markdownRemark(id: {eq: $id }) {
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
            fluid(maxWidth: 450) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        author
        category
        title
        description
        tags
        sources {
          link
          source
        }
      }
    }
  }
`
