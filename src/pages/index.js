import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Content from '../components/article/content'
import Header from '../components/article/header'
import Introduction from '../components/introduction'

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout>
      <Introduction />
      <div className="Column">
        {posts.map(({ node: post }) => {
          return (
            <article className="Article" key={post.id}>
              <Header post={post} forListing={true} />
              <Content post={post} forListing={true} />
            </article>
          )
        })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { date: { ne: null } } }
    ) {
      edges {
        node {
          id
          html
          ...Index_frontmatter
        }
      }
    }
  }
`
