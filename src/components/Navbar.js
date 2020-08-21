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
    <nav className="flex items-center justify-between font-medium text-gray-600 p-6 py-4 mb-8">
      <div className="flex items-center flex-shrink-0 mr-6">
        <Link to={`/`} className="block mt-4 inline-block mt-0 mr-4">
          <Img
            fluid={logo.childImageSharp.fluid}
            alt={title}
            className="inline-block"
            style={{ height: '50px', width: '50px', backgroundColor: 'none' }}
          />
        </Link>
      </div>
      <div className="w-full block flex-grow flex items-center w-auto">
        <div className="flex-grow">
          {categories.map(({ title, slug }) => (
            <Link key={slug} to={slug} className="block mt-4 inline-block leading-none mt-0 hover:text-gray-700 mr-4">
              {title}
            </Link>
          ))}
        </div>
        <div>
          <a href="/rss.xml"
            className="inline-block text-sm px-4 py-2 leading-none border rounded hover:border-transparent hover:text-gray-700 mt-4 mt-0" type="application/rss+xml" rel="alternate">
            <FontAwesomeIcon icon={faRss} />
          </a>
        </div>
      </div>
    </nav>
  )
}
