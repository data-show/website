import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

import Content, { HTMLContent } from '../components/Content'
import BlogPostCard from '../components/BlogPostCard'
import Layout from '../components/Layout'

export const CategoryTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}

CategoryTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const Category = ({
  data: {
    markdownRemark: category,
    allMarkdownRemark: { edges: postEdges },
  },
}) => (
  <Layout>
    <CategoryTemplate
      content={category.html}
      contentComponent={HTMLContent}
      description={category.frontmatter.description}
      helmet={
        <Helmet titleTemplate="%s">
          <title>{`${category.frontmatter.title}`}</title>
          <meta
            name="description"
            content={`${category.frontmatter.description}`}
          />
        </Helmet>
      }
      title={category.frontmatter.title}
    />

    {postEdges.map(
      ({
        node: {
          fields: { slug },
          frontmatter: { title, description, image },
        },
      }) => (
        <BlogPostCard
          key={slug}
          slug={slug}
          title={title}
          description={description}
          image={image}
        />
      )
    )}
  </Layout>
)

Category.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Category

export const pageQuery = graphql`
  query CategoryByID($id: String!, $title: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: 0
      limit: 10
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          category: { eq: $title }
        }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            featuredimage
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
