import { Link } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const AuthorCard = ({ name, description, image, slug }) => (
  <div className="max-w-sm rounded overflow-hidden">
    {image && (
      <Link to={slug}>
        <Img
          fluid={image.childImageSharp.fluid}
          alt={name}
          title={name}
          className="w-full"
        />
      </Link>
    )}
    <Link to={slug}>
      <div className="py-2">
        <h3 className="font-bold text-xl mb-2">{name}</h3>
        <p className="text-gray-700 text-lg">{description}</p>
      </div>
    </Link>
  </div>
)

AuthorCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.object,
  slug: PropTypes.string,
}

export default AuthorCard
