import { Link } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const DataVizPostCard = ({ title, image, slug }) => (
  <div className="max-w-sm rounded">
    <Link to={slug}>
      <Img
        fluid={image.childImageSharp.fluid}
        alt={title}
        title={title}
        className="w-full opacity-100 transition duration-300 hover:opacity-75"
      />
    </Link>
  </div>
)

DataVizPostCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.object,
  slug: PropTypes.string,
}

export default DataVizPostCard
