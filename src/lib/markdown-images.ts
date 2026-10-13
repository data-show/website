import type { Element } from 'hast'
import type { HastPluginDefinition } from 'satteri'

/** Rendered width of the article body: 896px on xl, 672px on md, else the viewport. */
const SIZES = '(min-width: 1280px) 896px, (min-width: 672px) 672px, 100vw'
const WIDTHS = [640, 960, 1280, 1792]

/**
 * Turns every local Markdown image into `<picture>` with an AVIF source and the
 * WebP `<img>` fallback, both sized for the article column. The `__ASTRO_IMAGE_`
 * marker is resolved by Astro like the one it puts on `<img>`.
 */
export const markdownImages: HastPluginDefinition = {
  name: 'markdown-images',
  element: {
    filter: ['img'],
    visit(node, ctx) {
      const { src, ...rest } = node.properties ?? {}
      if (typeof src !== 'string') return

      const localImagePaths = ctx.data.astro?.localImagePaths
      if (!localImagePaths?.has(decodeURI(src))) return

      ctx.replaceNode(node, {
        type: 'element',
        tagName: 'picture',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'source',
            properties: {
              type: 'image/avif',
              __ASTRO_IMAGE_: JSON.stringify({
                src: decodeURI(src),
                format: 'avif',
                widths: WIDTHS,
                sizes: SIZES,
              }),
            },
            children: [],
          },
          {
            type: 'element',
            tagName: 'img',
            // Not HTML attributes: Astro's marker forwards them to getImage().
            properties: {
              ...rest,
              src,
              widths: WIDTHS,
              sizes: SIZES,
            } as unknown as Element['properties'],
            children: [],
          },
        ],
      })
    },
  },
}
