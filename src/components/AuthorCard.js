import { Link } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const AuthorCard = ({ name, description, image, slug }) => (
  <Link to={slug}>
    <div className="pure-g">
      {image && (
        <div className="pure-u-1-1">
          <Img
            fluid={image.childImageSharp.fluid}
            alt={name}
            className="pure-img"
          />
        </div>
      )}
      <div className="pure-u-1-1">
        <h2>{name}</h2>
      </div>
      <div className="pure-u-1-1">
        <p>{description.substr(0, description.lastIndexOf(' ', 255)) + '...'}</p>
      </div>
    </div>
  </Link >
)

AuthorCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.object,
  slug: PropTypes.string,
}

export default AuthorCard
