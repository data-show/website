import React from 'react'

import BlogPostCard from '../../components/BlogPostCard'
import Layout from '../../components/Layout'

import useLatestPosts from '../../queries/latest-posts'

const BlogIndexPage = () => {
  const posts = useLatestPosts()

  return (
    <Layout>
      {posts.map(({ slug, title, description, featuredimage }) => (
        <BlogPostCard
          slug={slug}
          title={title}
          description={description}
          image={featuredimage}
        />
      ))}
    </Layout>
  )
}

export default BlogIndexPage
