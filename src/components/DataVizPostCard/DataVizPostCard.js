import { Link } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const DataVizPostCard = ({ title, description, image, slug }) => (
  <div className="rounded w-full">
    <Link to={slug}>
      <Img
        fluid={image.childImageSharp.fluid}
        alt={title}
        title={title}
        className="h-40 rounded"
      />
    </Link>
    <div className="p-4 pl-0">
      <Link to={slug}>
        <h2 className="font-bold text-xl text-gray-800">{title}</h2>
      </Link>
      {description && (
        <p className="text-gray-700 mt-2">{description}</p>
      )}

      <Link to={slug} className="inline-block py-2 rounded text-gray-900 mt-2 ml-auto">Read more</Link>
    </div>
  </div>
)

DataVizPostCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.object,
  slug: PropTypes.string,
}

export default DataVizPostCard
