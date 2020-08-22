import React from 'react'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

import useSiteMetadata from '../queries/site-metadata'

import './all.css'

const TemplateWrapper = ({ children }) => {
  const { color } = useSiteMetadata()

  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="alternate"
          type="application/rss+xml"
          href={`${withPrefix('/')}rss.xml`}
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <link rel="manifest" href="/manifest.webmanifest" />

        <meta name="theme-color" content={color} />
        <meta name="msapplication-navbutton-color" content={color} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="msapplication-TileColor" content={color} />
      </Helmet>

      <body>
        <main className="antialiased">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <Navbar />
          </div>
          {children}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <Footer />
          </div>
        </main>
      </body>
    </>
  )
}

export default TemplateWrapper
