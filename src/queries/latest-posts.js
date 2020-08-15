import { graphql, useStaticQuery } from 'gatsby'

const useLatestPosts = () => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(
    graphql`
      query LatestPostsQuery {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          skip: 0
          limit: 10
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              frontmatter {
                title
                description
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 450) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  return edges.map(({ node: { fields, frontmatter } }) => ({
    slug: fields.slug,
    title: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.featuredimage,
  }))
}

export default useLatestPosts
