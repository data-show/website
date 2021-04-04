import React from 'react'
import { Link } from 'gatsby'

import useSiteMetadata from '../queries/site-metadata'
import useCategories from '../queries/categories'

import Logo from './Logo'

export default function Navbar() {
  const { title } = useSiteMetadata()
  const categories = useCategories()

  return (
    <header className="flex items-center justify-between py-2">
      <Link to={`/`} className="px-2 lg:px-0 font-bold capitalize">
        <Logo title={title} className="inline-block" />
      </Link>
      <button className="block md:hidden px-2 text-3xl">
        <i className="bx bx-menu"></i>
      </button>
      <ul className="hidden md:inline-flex items-center">
        {categories.map(({ title, slug }) => (
          <li key={slug} className="px-2 md:px-4">
            <Link to={slug} className="text-gray-500 font-semibold hover:text-gray-700">
              {title}
            </Link>
          </li>
        ))}
        <li key='dataviz' className="px-2 md:px-4">
          <Link to={`/dataviz`} className="text-gray-500 font-semibold hover:text-gray-700">
            DataViz
           </Link>
        </li>
      </ul>
    </header>
  );
}
