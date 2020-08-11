import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const SourceTemplate = ({
  content,
  contentComponent,
  description,
  name,
  helmet,
}) => {
  const sourceContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {name}
            </h1>
            <p>{description}</p>
            <sourceContent content={content} />
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
  name: PropTypes.string,
  helmet: PropTypes.object,
}

const Source = ({ data }) => {
  const { markdownRemark: source } = data

  return (
    <Layout>
      <SourceTemplate
        content={source.html}
        contentComponent={HTMLContent}
        description={source.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Source">
            <title>{`${source.frontmatter.name}`}</title>
            <meta
              name="description"
              content={`${source.frontmatter.description}`}
            />
          </Helmet>
        }
        title={source.frontmatter.name}
      />
    </Layout>
  )
}

Source.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Source

export const pageQuery = graphql`
  query SourceByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        name
        description
      }
    }
  }
`
