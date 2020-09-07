import { faFacebookF, faPinterestP, faLinkedinIn, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { GatsbySeo, ArticleJsonLd } from 'gatsby-plugin-next-seo'
import { kebabCase } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { FacebookShareButton, LinkedinShareButton, PinterestShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'

import Layout from '../components/Layout'

const DataVizPost = ({ data: { post, category, author, logo, site: { siteMetadata: { title: siteName, siteUrl, social } } } }) => {
  const url = `${siteUrl}${post.fields.slug}`
  const tags = post.frontmatter.tags
  const title = post.frontmatter.title
  const description = post.frontmatter.description
  const publishedDate = post.frontmatter.date
  const hashtags = tags.map(tag => `${tag.split(' ').join('')}`)
  const sources = post.frontmatter.sources

  return (
    <Layout>
      <GatsbySeo
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        canonical={url}
        openGraph={{
          title: post.frontmatter.title,
          description: post.frontmatter.description,
          url,
          type: 'article',
          article: {
            publishedTime: post.frontmatter.date,
            modifiedTime: post.frontmatter.date,
            section: category.frontmatter.title,
            authors: [`${siteUrl}${author.frontmatter.slug}`],
            tags: post.frontmatter.tags,
          },
          images: [post.frontmatter.media.childImageSharp.fluid.src],
        }}
      />
      <ArticleJsonLd
        url={`${siteUrl}${post.fields.slug}`}
        headline={post.frontmatter.title}
        images={[post.frontmatter.media.childImageSharp.fluid.src]}
        datePublished={post.frontmatter.date}
        dateModified={post.frontmatter.date}
        authorName={author.frontmatter.name}
        publisherLogo={logo.childImageSharp.fluid.src}
        description={post.frontmatter.description}
        overrides={{
          '@type': 'BlogPosting',
        }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <header className="pt-2 pb-2 xl:pb-4 lg:border-b-2 lg:border-gray-200">
          <h1 className="text-3xl leading-12 text-gray-800 md:text-4xl md:leading-14 mb-2">
            {title}
          </h1>
          <p className="text-lg leading-4 text-gray-600 md:text-xl md:leading-6 mb-4">
            {description}
          </p>

          <div className="space-y-4 text-left">
            <div className="grid grid-cols-4 gap-2 py-2">
              <div className="col-span-4 md:col-span-3 flex">
                <Img
                  fluid={author.frontmatter.image.childImageSharp.fluid}
                  alt={author.frontmatter.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div className="text-sm">
                  <Link
                    className="text-gray-900 leading-none"
                    to={author.fields.slug}
                  >
                    {author.frontmatter.name}
                  </Link>
                  <p className="text-gray-600">
                    {format(new Date(publishedDate), 'PP')}
                  </p>
                </div>
              </div>

              <div className="col-span-4 md:col-span-1 inline-flex items-center text-lg">
                <PinterestShareButton
                  url={url}
                  media={post.frontmatter.media.childImageSharp.fluid.src}
                  description={description}
                  resetButtonStyle={false}
                  className="cursor-pointer h-8 w-8 bg-gray-700 hover:bg-white text-white hover:text-gray-900 border-solid hover:border-2 hover:border-gray-900 transition duration-300 font-bold mr-1 rounded-full"
                >
                  <FontAwesomeIcon icon={faPinterestP} />
                </PinterestShareButton>
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

        <Img
          fluid={post.frontmatter.media.childImageSharp.fluid}
          alt={post.frontmatter.title}
          className="w-full"
        />

        <div className="mt-6 mb-2">
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
                <OutboundLink href={source.link} target="_blank" rel="noreferrer">
                  {source.source}
                </OutboundLink>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </Layout>
  )
}

DataVizPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default DataVizPost

export const pageQuery = graphql`
  query DataVizPostByID($id: String!, $category: String!, $author: String!) {
    post: markdownRemark(id: { eq: $id }) {
      id
      fields {
        slug
      }
      frontmatter {
        date
        language
        media {
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
        twitter
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
    logo: file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        fluid(maxWidth: 100, maxHeight: 100) {
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
