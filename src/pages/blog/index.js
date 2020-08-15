import React from 'react'

import BlogPostCard from '../../components/BlogPostCard'
import Layout from '../../components/Layout'

import useLatestPosts from '../../queries/latest-posts'

const BlogIndexPage = () => {
  const posts = useLatestPosts()

  return (
    <Layout>
      <div className="content">
        <h2>Latest Posts</h2>

        {posts.map(({ slug, title, description, featuredimage }) => (
          <BlogPostCard
            slug={slug}
            title={title}
            description={description}
            image={featuredimage}
          />
        ))}
      </div>
    </Layout>
  )
}

export default BlogIndexPage
