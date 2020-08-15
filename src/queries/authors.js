import { graphql, useStaticQuery } from 'gatsby'

const useAuthors = () => {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(
    graphql`
      query SiteAuthorsQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "author" } } }
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              name
              description
              image {
                childImageSharp {
                  fluid(maxWidth: 450) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  return nodes.map(({ fields, frontmatter }) => ({
    slug: fields.slug,
    name: frontmatter.name,
    description: frontmatter.description,
    image: frontmatter.image
  }))
}

export default useAuthors
