import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
  const { logo, site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        logo: file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fluid(maxWidth: 50, maxHeight: 50) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
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
