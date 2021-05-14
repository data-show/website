import React from 'react'
import { kebabCase } from 'lodash'
import { Link, graphql } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'

import Layout from '../../components/Layout'

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { siteUrl, title },
    },
  },
}) => (
    <Layout>
      <section className="section">
        <GatsbySeo
          title={`Tags | ${title}`}
          description={`List of tags`}
          canonical={`${siteUrl}tags`}
        />
        <div className="container content">
          <div className="columns">
            <div
              className="column is-10 is-offset-1"
              style={{ marginBottom: '6rem' }}
            >
              <h1 className="title is-size-2 is-bold-light">Tags</h1>
              <ul className="taglist">
                {group.map(tag => (
                  <li key={tag.fieldValue}>
                    <Link to={`/tags/${kebabCase(tag.fieldValue)}`}>
                      {tag.fieldValue} ({tag.totalCount})
                  </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
