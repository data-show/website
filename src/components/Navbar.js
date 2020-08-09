import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'


import useSiteMetadata from '../queries/site-metadata'
import useCategories from '../queries/categories'

export default function Navbar() {
  const { logo, title } = useSiteMetadata()
  const categories = useCategories()

  return (
    <nav className="pure-menu pure-menu-horizontal pure-menu-scrollable main-menu content">
      <Link to="/" className="pure-menu-heading pure-menu-link">
        <Img
          fluid={logo.childImageSharp.fluid}
          alt={title}
          className="pure-img"
          style={{ height: '50px', width: '50px', backgroundColor: 'none' }}
        />
      </Link>

      <ul className="pure-menu-list">
        {categories.map(({ title, slug }) => (
          <li key={slug} className="pure-menu-item">
            <Link to={slug} className="pure-menu-link">
              {title}
            </Link>
          </li>
        ))}
      </ul>

      <ul className="pure-menu-list float-right">
        <li className="pure-menu-item">
          <a href="/rss.xml"
            className="pure-menu-link" type="application/rss+xml" rel="alternate">
            <FontAwesomeIcon icon={faRss} />
          </a>
        </li>
      </ul>
    </nav>
  )
}
