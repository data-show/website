import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faInstagram,
  faYoutube,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import useSiteMetadata from '../queries/site-metadata'

const Footer = () => {
  const { social: { twitter, instagram, youtube, github, linkedin } } = useSiteMetadata()

  return (
    <footer>
      <div className="pure-menu pure-menu-horizontal pure-menu-scrollable main-menu content">
        <ul className="pure-menu-list">
          <li className="pure-menu-item">
            <a href="/admin" className="pure-menu-link">
              Contribute
            </a>
          </li>
        </ul>

        <ul className="pure-menu-list float-right">
          {twitter && (
            <li className="pure-menu-item">
              <OutboundLink
                className="pure-menu-link"
                href={`https://twitter.com/${twitter}`}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </OutboundLink>
            </li>
          )}

          {instagram && (
            <li className="pure-menu-item">
              <OutboundLink
                className="pure-menu-link"
                href={`https://www.instagram.com/${instagram}`}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </OutboundLink>
            </li>
          )}

          {youtube && (
            <li className="pure-menu-item">
              <OutboundLink
                className="pure-menu-link"
                href={`https://www.youtube.com/channel/${youtube}`}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </OutboundLink>
            </li>
          )}

          {github && (
            <li className="pure-menu-item">
              <OutboundLink
                className="pure-menu-link"
                href={`https://github.com/${github}`}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} />
              </OutboundLink>
            </li>
          )}

          {linkedin && (
            <li className="pure-menu-item">
              <OutboundLink
                className="pure-menu-link"
                href={`https://www.linkedin.com/company/${linkedin}`}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </OutboundLink>
            </li>
          )}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
