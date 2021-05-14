import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'
import { OutboundLink } from 'gatsby-plugin-google-gtag'
import {
  GatsbySeo,
  ArticleJsonLd,
  BreadcrumbJsonLd,
} from 'gatsby-plugin-next-seo'
import { kebabCase } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'

import BlogPostCard from '../components/BlogPostCard'
import DataVizPostCard from '../components/DataVizPostCard'
import { HTMLContent } from '../components/Content'
import NewsletterForm from '../components/NewsletterForm'
import Layout from '../components/Layout'

const BlogPost = ({
  data: {
    post,
    category,
    author,
    lastPosts: { edges: lastPosts },
    lastDataviz: { edges: lastDataviz },
    site: {
      siteMetadata: { title: siteName, siteUrl, social },
    },
  },
}) => {
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
              url: `${siteUrl}${getSrc(post.frontmatter.featuredimage)}`,
              alt: post.frontmatter.title,
            },
          ],
        }}
      />
      <ArticleJsonLd
        url={url}
        headline={post.frontmatter.title}
        images={[`${siteUrl}${getSrc(post.frontmatter.featuredimage)}`]}
        datePublished={publishedDate}
        dateModified={publishedDate}
        authorName={author.frontmatter.name}
        publisherLogo={`${siteUrl}/logo.png`}
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
            item: `${siteUrl}/`,
          },

          {
            position: 2,
            name: category.frontmatter.title,
            item: `${siteUrl}${category.fields.slug}`,
          },

          {
            position: 3,
            name: title,
            item: url,
          },
        ]}
      />

      <article className="max-w-2xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0">
        <header className="pt-2 pb-2 xl:pb-4 lg:border-b-2 lg:border-gray-200">
          <GatsbyImage
            image={getImage(post.frontmatter.featuredimage)}
            className="rounded-md object-cover w-full h-64 lg:h-96 mb-4 lg:mb-8"
            alt={title}
            title={title}
          />
          <div className="space-y-4 text-left">
            <AnchorLink href="#sources" className="underline">
              Sources
            </AnchorLink>{' '}
            <AnchorLink href="#notebooks" className="underline">
              Notebooks
            </AnchorLink>
            <h1 className="text-3xl leading-12 text-gray-800 lg:text-4xl lg:leading-14 mb-2">
              {title}
            </h1>
            <p className="text-lg leading-6 text-gray-600 lg:text-xl lg:leading-8 mb-4">
              {description}
            </p>
            <div className="grid grid-cols-4 gap-2 py-2">
              <div className="col-span-4 lg:col-span-3 flex">
                <Link
                  className="text-gray-900 leading-none"
                  to={author.fields.slug}
                >
                  <GatsbyImage
                    image={getImage(author.frontmatter.image)}
                    alt={author.frontmatter.name}
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
                    <span>{format(new Date(publishedDate), 'PP')}</span> -{' '}
                    <span>{`${readingTime} minute${
                      readingTime > 1 && 's'
                    } read`}</span>
                  </p>
                </div>
              </div>

              <div className="col-span-4 lg:col-span-1 inline-flex items-center text-lg">
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
          <HTMLContent
            className="prose prose-lg max-w-none"
            content={post.html}
          />
        </div>

        <div className="mt-6 mb-2">
          <div className="my-4 lg:my-8" id="sources">
            <h2 className="font-bold text-xl mb-2">Sources</h2>

            <hr className="my-4" />

            {sources.length > 0 ? (
              sources.map(source => (
                <OutboundLink
                  className="underline"
                  href={source.link}
                  target="_blank"
                  rel="noopener nofollow"
                >
                  {source.source}
                </OutboundLink>
              ))
            ) : (
              <span>There is no sources for this article.</span>
            )}
          </div>

          <div className="my-4 lg:my-8" id="notebooks">
            <h2 className="font-bold text-xl mb-2">Notebooks</h2>

            <hr className="my-4" />

            {notebooks.length > 0 ? (
              notebooks.map(notebook => (
                <OutboundLink
                  className="underline"
                  href={notebook.link}
                  target="_blank"
                >
                  {notebook.title}
                </OutboundLink>
              ))
            ) : (
              <span>There is no notebooks for this article.</span>
            )}
          </div>

          <section className="my-8 lg:my-12 mx-auto bg-gray-700 p-6 w-full lg:w-3/4">
            <p className="font-bold text-white text-lg mb-4">
              Did you find this article interesting ? Subscribe to the
              newsletter.
            </p>
            <NewsletterForm />
          </section>

          <section className="mt-8">
            <h3 className="font-bold text-xl mb-2">Latest Posts</h3>

            <hr className="my-4" />

            <div className="block space-x-0 lg:flex lg:space-x-6">
              {lastPosts.map(
                ({
                  node: {
                    fields: { slug },
                    frontmatter: { title, featuredimage },
                  },
                }) => (
                  <BlogPostCard
                    className="mx-4"
                    key={slug}
                    slug={slug}
                    title={title}
                    image={featuredimage}
                  />
                )
              )}
            </div>
          </section>

          <section className="mt-8">
            <div className="flex mb-2 px-4 lg:px-0 items-center justify-between">
              <h2 className="font-bold text-xl">Latest DataViz</h2>
              <Link
                to={`/dataviz`}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded cursor-pointer"
              >
                View all
              </Link>
            </div>

            <hr className="my-4" />

            <div className="block space-x-0 lg:flex lg:space-x-6">
              {lastDataviz.map(
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
                    image={getImage(media)}
                  />
                )
              )}
            </div>
          </section>

          <div className="my-4 lg:my-8">
            {tags.map(tag => (
              <Link
                key={tag + `tag`}
                to={`/tags/${kebabCase(tag)}`}
                className="inline-block bg-gray-200 px-4 py-2 text-sm text-gray-700 mr-2 mb-2"
              >
                {tag}
              </Link>
            ))}
          </div>
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
            gatsbyImageData(
              height: 350
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              layout: CONSTRAINED
            )
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
            gatsbyImageData(
              width: 75
              height: 75
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              layout: CONSTRAINED
            )
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
      }
    }
    lastPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: 0
      limit: 3
      filter: {
        frontmatter: { templateKey: { eq: "blog-post" } }
        id: { ne: $id }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            featuredimage {
              childImageSharp {
                gatsbyImageData(
                  height: 350
                  width: 350
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
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
    lastDataviz: allMarkdownRemark(
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
                gatsbyImageData(
                  height: 350
                  width: 350
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
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
        title
        siteUrl
        social {
          twitter
        }
      }
    }
  }
`
