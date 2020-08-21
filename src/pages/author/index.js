import React from 'react'
import Helmet from 'react-helmet'

import AuthorCard from '../../components/AuthorCard'
import Layout from '../../components/Layout'

import useAuthors from '../../queries/authors'

const BlogIndexPage = () => {
  const authors = useAuthors()

  return (
    <Layout>
      <Helmet titleTemplate="%s">
        <title>{`Authors`}</title>
        <meta
          name="description"
          content={`website authors`}
        />
      </Helmet>

      <section className="max-w-3xl mx-auto px-2 sm:px-4 xl:max-w-5xl xl:px-0">
        <div className="space-y-4 text-left py-2 mb-6 lg:mb-8">
          <h1 className="text-3xl leading-9 text-gray-800 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 mb-2">Authors</h1>
        </div>

        <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map(({ slug, name, description, image }) => (
            <AuthorCard
              className="mx-4"
              key={slug}
              slug={slug}
              name={name}
              description={description}
              image={image}
            />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default BlogIndexPage
