import { graphql, useStaticQuery } from 'gatsby'

const useCategories = () => {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(
    graphql`
      query SiteCategoriesQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "category" } } }
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    `
  )

  return nodes.map(({ fields, frontmatter }) => ({
    slug: fields.slug,
    title: frontmatter.title,
  }))
}

export default useCategories
