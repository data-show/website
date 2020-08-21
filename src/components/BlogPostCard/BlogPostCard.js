import { Link } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const BlogPostCard = ({ title, description, image, slug }) => (
  <div className="max-w-sm rounded overflow-hidden">
    {image && (
      <Link to={slug}>
        <Img
          fluid={image.childImageSharp.fluid}
          alt={title}
          title={title}
          className="w-full"
        />
      </Link>
    )}
    <Link to={slug}>
      <div className="py-2">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-700 text-lg">{description.substr(0, description.lastIndexOf(' ', 80)) + '...'}</p>
      </div>
    </Link>
  </div>
)

BlogPostCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.object,
  slug: PropTypes.string,
}

export default BlogPostCard
