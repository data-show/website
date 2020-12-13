import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faInstagram,
  faYoutube,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import useSiteMetadata from '../queries/site-metadata'
import useCategories from '../queries/categories'

const Footer = () => {
  const {
    description,
    social: { twitter, instagram, youtube, github, linkedin },
  } = useSiteMetadata()
  const categories = useCategories()

  return (
    <footer className="border-t mt-12 pt-12 pb-12 px-4 lg:px-0">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-3/5">
          <h6 className="font-semibold text-gray-700 mb-4">Project</h6>
          <p className="text-gray-600 hidden lg:block p-0 lg:pr-12">
            {description}
          </p>
        </div>

        <div className="w-full mt-6 lg:mt-0 md:w-1/2 lg:w-1/5">
          <h6 className="font-semibold text-gray-700 mb-4">Content</h6>
          <ul>
            {categories.map(({ title, slug }) => (
              <li key={slug}>
                <Link to={slug} className="block text-gray-600 py-2">
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full mt-6 lg:mt-0 md:w-1/2 lg:w-1/5">
          <h6 className="font-semibold text-gray-700 mb-4">Social</h6>
          <ul>
            <li>
              <div className="flex justify-start items-center text-lg text-gray-500">
                {twitter && (
                  <OutboundLink
                    className="block flex items-center hover:text-gray-700 mr-5"
                    href={`https://twitter.com/${twitter}`}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </OutboundLink>
                )}

                {instagram && (
                  <OutboundLink
                    className="block flex items-center hover:text-gray-700 mr-5"
                    href={`https://www.instagram.com/${instagram}`}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </OutboundLink>
                )}

                {youtube && (
                  <OutboundLink
                    className="block flex items-center hover:text-gray-700 mr-5"
                    href={`https://www.youtube.com/channel/${youtube}`}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <FontAwesomeIcon icon={faYoutube} />
                  </OutboundLink>
                )}

                {github && (
                  <OutboundLink
                    className="block flex items-center hover:text-gray-700 mr-5"
                    href={`https://github.com/${github}`}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </OutboundLink>
                )}

                {linkedin && (
                  <OutboundLink
                    className="block flex items-center hover:text-gray-700 mr-5"
                    href={`https://www.linkedin.com/company/${linkedin}`}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </OutboundLink>
                )}

                <a
                  href="/rss.xml"
                  className="block flex items-center hover:text-gray-700 mr-5"
                  type="application/rss+xml"
                  rel="alternate nofollow"
                >
                  <FontAwesomeIcon icon={faRss} />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
