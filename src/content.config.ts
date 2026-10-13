import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'

const link = z.object({
  link: z.string(),
  source: z.string().optional(),
})

const notebook = z.object({
  title: z.string(),
  link: z.string(),
})

const post = {
  title: z.string(),
  date: z.coerce.date(),
  author: z.string(),
  description: z.string(),
  language: z.array(z.string()).default(['en']),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  sources: z.array(link).default([]),
  notebooks: z.array(notebook).default([]),
}

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      ...post,
      canonical: z.string().optional(),
      featuredimage: image(),
      featuredpost: z.boolean().optional(),
    }),
})

const dataviz = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dataviz' }),
  schema: ({ image }) =>
    z.object({
      ...post,
      media: image(),
    }),
})

const category = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/category' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
})

const author = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/author' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      username: z.string(),
      description: z.string(),
      image: image(),
      github: z.string().optional(),
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      website: z.string().optional(),
    }),
})

const source = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/source' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image().optional(),
      website: z.string(),
    }),
})

export const collections = { blog, dataviz, category, author, source }
