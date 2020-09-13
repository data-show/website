import { Link } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const DataVizPostCard = ({ name, image, slug }) => (
  <div className="max-w-sm rounded overflow-hidden">
    <Link to={slug}>
      <Img
        fluid={image.childImageSharp.fluid}
        alt={name}
        title={name}
        className="w-full"
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
