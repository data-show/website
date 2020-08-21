import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import PropTypes from 'prop-types'
import React from 'react'

import Layout from '../components/Layout'
import useSiteMetadata from '../queries/site-metadata'

export const AuthorTemplate = ({
  description,
  name,
  image,
  github,
  linkedin,
  website
}) => {
  return (
    <section>
      <div className="space-y-4 text-left py-2 mb-6 lg:mb-8">
        <Img
          fluid={image.childImageSharp.fluid}
          alt={name}
          className="w-full"
        />

        <h1 className="text-3xl leading-9 text-gray-800 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 mb-2">{name}</h1>
        <p className="text-lg text-gray-600 tracking-tight sm:text-lg md:text-xl md:leading-8 mb-4">{description}</p>
      </div>

      <div className="flex justify-start items-center text-lg text-gray-500">
        {website && (
          <OutboundLink className="block flex items-center hover:text-gray-700 mr-5" href={website} target="_blank" rel="noreferrer">{website}</OutboundLink>
        )}
        {github && (
          <OutboundLink className="block flex items-center hover:text-gray-700 mr-5" href={`https://github.com/${github}`} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </OutboundLink>
        )}
        {linkedin && (
          <OutboundLink className="block flex items-center hover:text-gray-700 mr-5" href={linkedin} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </OutboundLink>
        )}
      </div>
    </section>
  )
}

AuthorTemplate.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.shape,
  github: PropTypes.string,
  linkedin: PropTypes.string,
  website: PropTypes.string
}

const Author = ({ data }) => {
  const { markdownRemark: author } = data
  const { siteUrl } = useSiteMetadata()

  return (
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
            username: author.frontmatter.github
          },
          images: [
            author.frontmatter.image.childImageSharp.fluid.src
          ],
        }}
      />

      <section className="max-w-3xl mx-auto px-2 sm:px-4 xl:max-w-5xl xl:px-0">
        <AuthorTemplate
          description={author.frontmatter.description}
          name={author.frontmatter.name}
          image={author.frontmatter.image}
          github={author.frontmatter.github}
          linkedin={author.frontmatter.linkedin}
          website={author.frontmatter.website}
        />
      </section>
    </Layout>
  )
}

Author.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Author

export const pageQuery = graphql`
  query AuthorByID($id: String!) {
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
        github
        linkedin
        website
      }
    }
  }
`
