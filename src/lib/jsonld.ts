import { SITE_LOGO, SITE_TITLE } from '../consts'

export const breadcrumb = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(({ name, url }, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name,
    item: url,
  })),
})

export const article = (data: {
  type?: string
  url: string
  headline: string
  image: string
  datePublished: Date
  authorName: string
  description: string
  site: URL
}) => ({
  '@context': 'https://schema.org',
  '@type': data.type ?? 'Article',
  mainEntityOfPage: { '@type': 'WebPage', '@id': data.url },
  headline: data.headline,
  image: [data.image],
  datePublished: data.datePublished.toISOString(),
  dateModified: data.datePublished.toISOString(),
  author: { '@type': 'Person', name: data.authorName },
  publisher: {
    '@type': 'Organization',
    name: SITE_TITLE,
    logo: { '@type': 'ImageObject', url: new URL(SITE_LOGO, data.site).href },
  },
  description: data.description,
})
