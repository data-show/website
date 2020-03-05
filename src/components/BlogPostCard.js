import { Link } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'

const BlogPostCard = ({ title, description, image, slug }) => (
  <Link to={slug}>
    <span>{title}</span>
    <p>{description}</p>
  </Link>
)

BlogPostCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
}

export default BlogPostCard
