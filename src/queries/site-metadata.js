import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
  const { logo, site } = useStaticQuery(
    graphql`
      query MetadataQuery {
        logo: file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fluid(maxWidth: 75, maxHeight: 75) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        site {
          siteMetadata {
            siteUrl
            title
            description
            color
            social {
              twitter
              instagram
              youtube
              github
              linkedin
            }
          }
        }
      }
    `
  )

  return { logo, ...site.siteMetadata }
}

export default useSiteMetadata
