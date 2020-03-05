import React from 'react'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

import useSiteMetadata from '../queries/site-metadata'

import './all.scss'

const TemplateWrapper = ({ children }) => {
  const { siteUrl, title, description, color } = useSiteMetadata()

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

        {/* {% if FEED_ALL_ATOM %}
    <link href="{{ FEED_DOMAIN }}/{% if FEED_ALL_ATOM_URL %}{{ FEED_ALL_ATOM_URL }}{% else %}{{ FEED_ALL_ATOM }}{% endif %}" type="application/atom+xml" rel="alternate" title="{{ SITENAME }} Atom Feed" /> {% endif %} {% if FEED_ALL_RSS %}
    <link href="{{ FEED_DOMAIN }}/{% if FEED_ALL_RSS_URL %}{{ FEED_ALL_RSS_URL }}{% else %}{{ FEED_ALL_RSS }}{% endif %}" type="application/rss+xml" rel="alternate" title="{{ SITENAME }} RSS Feed" /> {% endif %} {% block extra_head %}{% endblock extra_head %} {% if FAVICON %}
    {% endif %}

        {% if GOOGLE_ANALYTICS %} {% include "partial/ga.html" %} {% endif %} */}

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
        <meta property="og:title" content="{{ SITENAME }}" />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content="{{ SITELOGO }}" />

        {/* <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "Blog",
              "name": "{title}",
              "url": "{{ SITEURL }}",
              "image": "{{ SITELOGO }}",
              "description": {description}
            }
          `}
        </script> */}
      </Helmet>

      <body className="layout" style={{ padding: '2em 0' }}>
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
