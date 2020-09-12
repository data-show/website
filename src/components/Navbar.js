import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import useSiteMetadata from '../queries/site-metadata'
import useCategories from '../queries/categories'

export default function Navbar() {
  const { logo, title } = useSiteMetadata()
  const categories = useCategories()

  return (
    <nav className="flex items-center justify-between font-medium text-gray-600 p-3 md:p-6 mb-1 md:mb-4 lg:mb-8">
      <div className="flex items-center flex-shrink-0 md:mr-6">
        <Link to={`/`} className="block inline-block mr-4">
          <Img
            fluid={logo.childImageSharp.fluid}
            alt={title}
            className="inline-block"
            style={{ height: '50px', width: '50px', backgroundColor: 'none' }}
          />
        </Link>
        <Link to={`/`} className="block md:hidden inline-block visible md:invisible text-2xl py-2">
          Data Show
        </Link>
      </div>
      <div className="hidden w-full md:block flex-grow flex items-center w-auto text-lg">
        <div className="flex-grow">
          {categories.map(({ title, slug }) => (
            <Link
              key={slug}
              to={slug}
              className="block mt-4 inline-block leading-none mt-0 hover:text-gray-700 mr-4"
            >
              {title}
            </Link>
          ))}
          <Link
            key='dataviz'
            to={`/dataviz`}
            className="block mt-4 inline-block leading-none mt-0 hover:text-gray-700 mr-4"
          >
            DataViz
          </Link>
        </div>
      </div>
    </nav>
  )
}
