import { getCollection, type CollectionEntry } from 'astro:content'
import kebabCase from 'lodash-es/kebabCase.js'

type Post = CollectionEntry<'blog'> | CollectionEntry<'dataviz'>

const byDateDesc = (a: Post, b: Post) =>
  b.data.date.valueOf() - a.data.date.valueOf()

export const getPosts = async () =>
  (await getCollection('blog')).sort(byDateDesc)

export const getDataviz = async () =>
  (await getCollection('dataviz')).sort(byDateDesc)

export const getCategories = async () => getCollection('category')

export const getAuthors = async () => getCollection('author')

export const postUrl = (post: Post) => `/${post.collection}/${post.id}/`
export const categoryUrl = (category: CollectionEntry<'category'>) =>
  `/category/${category.id}/`
export const authorUrl = (author: CollectionEntry<'author'>) =>
  `/author/${author.id}/`

export const tagSlug = (tag: string) => kebabCase(tag)
export const tagUrl = (tag: string) => `/tags/${tagSlug(tag)}/`

export const getAuthor = async (username: string) => {
  const author = (await getAuthors()).find(
    ({ data }) => data.username === username
  )
  if (!author) throw new Error(`Unknown author "${username}"`)
  return author
}

export const getCategory = async (title: string) => {
  const category = (await getCategories()).find(
    ({ data }) => data.title === title
  )
  if (!category) throw new Error(`Unknown category "${title}"`)
  return category
}

/** Every tag used by blog posts and dataviz, with the posts carrying it. */
export const getTags = async () => {
  const [posts, dataviz] = await Promise.all([getPosts(), getDataviz()])
  const tags = new Map<
    string,
    {
      tag: string
      posts: CollectionEntry<'blog'>[]
      dataviz: CollectionEntry<'dataviz'>[]
    }
  >()

  const entry = (tag: string) => {
    const slug = tagSlug(tag)
    if (!tags.has(slug)) tags.set(slug, { tag, posts: [], dataviz: [] })
    return tags.get(slug)!
  }

  posts.forEach(post =>
    post.data.tags.forEach(tag => entry(tag).posts.push(post))
  )
  dataviz.forEach(item =>
    item.data.tags.forEach(tag => entry(tag).dataviz.push(item))
  )

  return [...tags.entries()].map(([slug, value]) => ({ slug, ...value }))
}
