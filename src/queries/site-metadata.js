import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
  const { logo, site } = useStaticQuery(
    graphql`query MetadataQuery {
  logo: file(relativePath: {eq: "logo.png"}) {
    childImageSharp {
      gatsbyImageData(width: 75, height: 75, layout: CONSTRAINED)
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
