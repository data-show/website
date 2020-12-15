import { faFacebookF, faLinkedinIn, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { GatsbySeo, ArticleJsonLd, BreadcrumbJsonLd } from 'gatsby-plugin-next-seo'
import { kebabCase } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'

import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'

const BlogPost = ({ data: { post, category, author, logo, site: { siteMetadata: { title: siteName, siteUrl, social } } } }) => {
  const url = `${siteUrl}${post.fields.slug}`
  const tags = post.frontmatter.tags
  const title = post.frontmatter.title
  const description = post.frontmatter.description
  const publishedDate = post.frontmatter.date
  const hashtags = tags.map(tag => `${tag.split(' ').join('')}`)
  const sources = post.frontmatter.sources
  const notebooks = post.frontmatter.notebooks
  const readingTime = Math.ceil(+post.fields.readingTime.minutes)

  return (
    <Layout>
      <GatsbySeo
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        canonical={post.frontmatter.canonical || url}
        openGraph={{
          title: post.frontmatter.title,
          description: post.frontmatter.description,
          url,
          type: 'article',
          article: {
            publishedTime: publishedDate,
            modifiedTime: publishedDate,
            section: category.frontmatter.title,
            authors: [`${siteUrl}${author.fields.slug}`],
            tags: post.frontmatter.tags,
          },
          images: [
            {
              url: `${siteUrl}${post.frontmatter.featuredimage.childImageSharp.fluid.src}`,
              alt: post.frontmatter.title
            }
          ],
        }}
      />
      <Helmet>
        <link rel="amphtml" href={`${siteUrl}/amp${post.fields.slug}`} />
      </Helmet>
      <ArticleJsonLd
        url={url}
        headline={post.frontmatter.title}
        images={[`${siteUrl}${post.frontmatter.featuredimage.childImageSharp.fluid.src}`]}
        datePublished={publishedDate}
        dateModified={publishedDate}
        authorName={author.frontmatter.name}
        publisherLogo={`${siteUrl}${logo.childImageSharp.fluid.src}`}
        description={post.frontmatter.description}
        overrides={{
          '@type': 'BlogPosting',
        }}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: 'Home',
            item: `${siteUrl}/`
          },

          {
            position: 2,
            name: category.frontmatter.title,
            item: `${siteUrl}${category.fields.slug}`
          },

          {
            position: 3,
            name: title,
            item: url
          }
        ]}
      />

      <article className="max-w-2xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0">
        <header className="pt-2 pb-2 xl:pb-4 lg:border-b-2 lg:border-gray-200">
          <Img fluid={post.frontmatter.featuredimage.childImageSharp.fluid} className="rounded-md object-cover w-full h-64 lg:h-96 mb-4 lg:mb-8" alt={title} title={title} />
          <div className="space-y-4 text-left">
            <h1 className="text-3xl leading-12 text-gray-800 md:text-4xl md:leading-14 mb-2">
              {title}
            </h1>
            <p className="text-lg leading-6 text-gray-600 md:text-xl md:leading-8 mb-4">
              {description}
            </p>

            <div className="grid grid-cols-4 gap-2 py-2">
              <div className="col-span-4 md:col-span-3 flex">
                <Link
                  className="text-gray-900 leading-none"
                  to={author.fields.slug}
                >
                  <Img
                    fluid={author.frontmatter.image.childImageSharp.fluid}
                    alt={author.frontmatter.name}
                    loading="eager"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                </Link>
                <div className="text-sm">
                  <Link
                    className="text-gray-900 leading-none"
                    to={author.fields.slug}
                  >
                    {author.frontmatter.name}
                  </Link>
                  <p className="text-gray-600">
                    <span>{format(new Date(publishedDate), 'PP')}</span> - <span>{`${readingTime} minute${readingTime > 1 && 's'} read`}</span>
                  </p>
                </div>
              </div>

              <div className="col-span-4 md:col-span-1 inline-flex items-center text-lg">
                <FacebookShareButton
                  url={url}
                  quote={title}
                  hashtag={`#${hashtags[0]}`}
                  resetButtonStyle={false}
                  className="cursor-pointer h-8 w-8 bg-gray-700 hover:bg-white text-white hover:text-gray-900 border-solid hover:border-2 hover:border-gray-900 transition duration-300 font-bold mr-1 rounded-full"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </FacebookShareButton>
                <TwitterShareButton
                  url={url}
                  title={title}
                  via={social.twitter}
                  hashtags={hashtags}
                  resetButtonStyle={false}
                  related={[social.twitter, author.frontmatter.twitter]}
                  className="cursor-pointer h-8 w-8 bg-gray-700 hover:bg-white text-white hover:text-gray-900 border-solid hover:border-2 hover:border-gray-900 transition duration-300 font-bold mr-1 rounded-full"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </TwitterShareButton>
                <LinkedinShareButton
                  url={url}
                  summary={description}
                  source={siteName}
                  resetButtonStyle={false}
                  className="cursor-pointer h-8 w-8 bg-gray-700 hover:bg-white text-white hover:text-gray-900 border-solid hover:border-2 hover:border-gray-900 transition duration-300 font-bold mr-1 rounded-full"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </LinkedinShareButton>
                <WhatsappShareButton
                  url={url}
                  title={title}
                  resetButtonStyle={false}
                  className="cursor-pointer h-8 w-8 bg-gray-700 hover:bg-white text-white hover:text-gray-900 border-solid hover:border-2 hover:border-gray-900 transition duration-300 font-bold mr-1 rounded-full"
                >
                  <FontAwesomeIcon icon={faWhatsapp} />
                </WhatsappShareButton>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-6 mb-2">
          <HTMLContent className="prose prose-lg max-w-none" content={post.html} />

          {tags && tags.length ? (
            <div className="py-2 my-4 md:my-8">
              {tags.map(tag => (
                <Link
                  key={tag + `tag`}
                  to={`/tags/${kebabCase(tag)}/`}
                  className="inline-block bg-gray-200 px-4 py-2 text-sm text-gray-700 mr-2 mb-2"
                >
                  {tag}
                </Link>
              ))}
            </div>
          ) : null}

          {sources && sources.length ? (
            <div className="my-4 md:my-8">
              <h2 className="text-lg text-gray-900 mb-2">Sources</h2>

              <hr className="my-4" />

              {sources.map(source => (
                <OutboundLink href={source.link} target="_blank" rel="noopener nofollow">
                  {source.source}
                </OutboundLink>
              ))}
            </div>
          ) : null}

          {notebooks && notebooks.length ? (
            <div className="my-4 md:my-8">
              <h2 className="text-lg text-gray-900 mb-2">Notebooks</h2>

              <hr className="my-4" />

              {notebooks.map(notebook => (
                <OutboundLink href={notebook.link} target="_blank">
                  {notebook.title}
                </OutboundLink>
              ))}
            </div>
          ) : null}
        </div>
      </article>
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
        readingTime {
          minutes
        }
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
        notebooks {
          link
          title
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
    author: markdownRemark(frontmatter: { username: { eq: $author } }) {
      id
      fields {
        slug
      }
      frontmatter {
        name
        twitter
        image {
          childImageSharp {
            fluid(maxWidth: 75, maxHeight: 75) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
    sources: markdownRemark(frontmatter: { username: { eq: $author } }) {
      id
      fields {
        slug
      }
      frontmatter {
        name
        image {
          childImageSharp {
            fluid(maxHeight: 75) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
    logo: file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        fluid(maxWidth: 75, maxHeight: 75) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    site {
      siteMetadata {
        title
        siteUrl
        social {
          twitter
        }
      }
    }
  }
`
