import clsx from 'clsx'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import PropTypes from 'prop-types'

const DataVizPostCard = ({ className, title, description, image, slug }) => (
  <div className={clsx('rounded w-full', className)}>
    <Link to={slug}>
      <GatsbyImage
        image={getImage(image)}
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
        <>
          <p className="text-gray-800 mt-2">{description}</p>
          <Link
            to={slug}
            className="inline-block py-2 rounded text-gray-900 mt-2 ml-auto"
          >
            Read more
          </Link>
        </>
      )}
    </div>
  </div>
)

DataVizPostCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  image: PropTypes.object,
  slug: PropTypes.string,
}

export default DataVizPostCard
