import { getImage } from 'astro:assets'
import type { ImageMetadata } from 'astro'

/** Absolute URL of the optimized version of an image, for meta tags and JSON-LD. */
export const absoluteImageUrl = async (image: ImageMetadata, site: URL) =>
  new URL(
    (await getImage({ src: image, width: 1200, format: 'jpg', layout: 'none' }))
      .src,
    site
  ).href
