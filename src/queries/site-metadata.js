import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
  const { logo, site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        logo: file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fluid(maxWidth: 75, maxHeight: 75) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        site {
          siteMetadata {
            siteUrl
            title
            description
            color
          }
        }
      }
    `
  )

  return { logo, ...site.siteMetadata }
}

export default useSiteMetadata
