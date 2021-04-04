import { StaticImage } from 'gatsby-plugin-image'
import PropTypes from 'prop-types'

export default function Logo({ title, className }) {
  return (
    <StaticImage
      image="./logo.png"
      alt={title}
      title={title}
      className={className}
      style={{ height: '50px', width: '50px', backgroundColor: 'none' }}
    />
  )
}

Logo.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string
}
