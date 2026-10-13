import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'

import { SITE_DESCRIPTION } from '../consts'
import { getPosts, postUrl } from '../lib/content'

const parser = new MarkdownIt()

export async function GET(context: APIContext) {
  const posts = await getPosts()

  return rss({
    title: 'Data Show RSS Feed',
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post),
      content: sanitizeHtml(parser.render(post.body ?? '')),
    })),
  })
}
