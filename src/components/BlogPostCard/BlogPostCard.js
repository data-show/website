import { Link } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

import styles from './BlogPostCard.module.css'

const BlogPostCard = ({ title, description, image, slug }) => (
  <Link to={slug}>
    <div className={styles.container}>
      <div className="pure-g">
        {image && (
          <div className="pure-u-1-1">
            <Img
              fluid={image.childImageSharp.fluid}
              alt={title}
              title={title}
              className="pure-img"
            />
          </div>
        )}
        <div className="pure-u-1-1">
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className="pure-u-1-1">
          <p className={styles.description}>{description.substr(0, description.lastIndexOf(' ', 80)) + '...'}</p>
        </div>
      </div>
    </div>
  </Link>
)

BlogPostCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.object,
  slug: PropTypes.string,
}

export default BlogPostCard
