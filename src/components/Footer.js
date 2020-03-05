import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faInstagram,
  faYoutube,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
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
          <li className="pure-menu-item">
            <a
              className="pure-menu-link"
              href="https://twitter.com/DataShow_"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </li>

          <li className="pure-menu-item">
            <a
              className="pure-menu-link"
              href="https://www.instagram.com/datashow_"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>

          <li className="pure-menu-item">
            <a
              className="pure-menu-link"
              href="https://www.youtube.com/channel/UC1siUJqeSI3Zoyj02tw1jgA"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </li>

          <li className="pure-menu-item">
            <a
              className="pure-menu-link"
              href="https://github.com/data-show"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </li>

          <li className="pure-menu-item">
            <a
              className="pure-menu-link"
              href="https://www.linkedin.com/company/data-show-blog"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
