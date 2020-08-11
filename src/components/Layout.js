import React from 'react'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

import useSiteMetadata from '../queries/site-metadata'

import './all.scss'

const TemplateWrapper = ({ children }) => {
  const { siteUrl, title, description, color, logo, social: { twitter } } = useSiteMetadata()

  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="stylesheet"
          href="https://unpkg.com/purecss@2.0.3/build/pure-min.css"
          integrity="sha384-cg6SkqEOCV1NbJoCu11+bm0NvBRc8IYLRGXkmNrqUBfTjmMYwNKPWBTIKyw9mHNJ"
          crossorigin="anonymous"
        />

        <link rel="alternate" type="application/rss+xml" href={`${withPrefix('/')}rss.xml`} />

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
        <link rel="manifest" href="/site.webmanifest" />

        <meta name="theme-color" content={color} />
        <meta name="msapplication-navbutton-color" content={color} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="msapplication-TileColor" content={color} />

        <meta property="og:site_name" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content={`${withPrefix('/')}${siteUrl}`} />
        <meta property="og:image" content={logo.childImageSharp.fluid.src} />

        <meta name="twitter:card" content="summary" />
        {twitter && (
          <meta name="twitter:site" content={twitter} />
        )}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={logo.childImageSharp.fluid.src} />

        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "Blog",
              "name": "${title}",
              "url": "${siteUrl}",
              "image": "${logo.childImageSharp.fluid.src}",
              "description": "${description}"
            }
          `}
        </script>
      </Helmet>

      <body className="layout">
        <main className="main">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </>
  )
}

export default TemplateWrapper
