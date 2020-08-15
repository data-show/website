import React from 'react'

import AuthorCard from '../../components/AuthorCard'
import Layout from '../../components/Layout'

import useAuthors from '../../queries/authors'

const BlogIndexPage = () => {
  const authors = useAuthors()

  return (
    <Layout>
      <div className="content">
        <h2>Authors</h2>

        {authors.map(({ slug, name, description, image }) => (
          <AuthorCard
            slug={slug}
            name={name}
            description={description}
            image={image}
          />
        ))}
      </div>
    </Layout>
  )
}

export default BlogIndexPage
