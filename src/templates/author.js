import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

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
    <section className="section">
      <div className="content">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <Img
              fluid={image.childImageSharp.fluid}
              alt={name}
              className="pure-img"
            />
          </div>
          <div className="pure-u-1-1">
            <h1>{name}</h1>
          </div>
          <div className="pure-u-1-1">
            <p>{description}</p>
          </div>
          <div className="pure-u-1-1">
            <div className="pure-menu pure-menu-horizontal pure-menu-scrollable content">
              <ul className="pure-menu-list">
                {website && (
                  <li className="pure-menu-item">
                    <OutboundLink className="pure-menu-link" href={website} target="_blank" rel="noreferrer">{website}</OutboundLink>
                  </li>
                )}
                {github && (
                  <li className="pure-menu-item">
                    <OutboundLink className="pure-menu-link" href={`https://github.com/${github}`} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon icon={faGithub} />
                    </OutboundLink>
                  </li>
                )}
                {linkedin && (
                  <li className="pure-menu-item">
                    <OutboundLink className="pure-menu-link" href={linkedin} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </OutboundLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
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

      <AuthorTemplate
        description={author.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Author">
            <title>{`${author.frontmatter.name}`}</title>
            <meta
              name="description"
              content={`${author.frontmatter.description}`}
            />
          </Helmet>
        }
        name={author.frontmatter.name}
        image={author.frontmatter.image}
        github={author.frontmatter.github}
        linkedin={author.frontmatter.linkedin}
        website={author.frontmatter.website}
      />
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
