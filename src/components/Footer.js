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

const Footer = () => {
  const {
    social: { twitter, instagram, youtube, github, linkedin },
  } = useSiteMetadata()

  return (
    <footer className="my-4">
      <div className="w-full block flex-grow inline-flex md:flex lg:items-center lg:w-auto">
        <div className="text-sm flex-grow text-gray-600">
          <Link
            to={`/author`}
            className="block mt-4 inline-block mt-0 hover:text-gray-700 mr-4"
          >
            Authors
          </Link>
        </div>

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
      </div>
    </footer>
  )
}

export default Footer
