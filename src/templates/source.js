import { graphql } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import PropTypes from 'prop-types'
import React from 'react'

import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const SourceTemplate = ({
  content,
  contentComponent,
  description,
  name
}) => {
  const sourceContent = contentComponent || Content

  return (
    <section className="section">
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {name}
            </h1>
            <p>{description}</p>
            <sourceContent className="prose prose-lg" content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}

SourceTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  name: PropTypes.string
}

const Source = ({ data: {
  markdownRemark: source,
  site: { siteMetadata: { siteUrl } }
} }) => (
    <Layout>
      <GatsbySeo
        title={source.frontmatter.name}
        description={source.frontmatter.description}
        canonical={`${siteUrl}${source.fields.slug}`}
      />
      <SourceTemplate
        content={source.html}
        contentComponent={HTMLContent}
        description={source.frontmatter.description}
        title={source.frontmatter.name}
      />
    </Layout>
  )

Source.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
    site: PropTypes.object
  }),
}

export default Source

export const pageQuery = graphql`
  query SourceByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        name
        description
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
