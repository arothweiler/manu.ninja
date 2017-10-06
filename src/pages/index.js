import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Header from '../components/article/header'
import Introduction from '../components/Introduction'

import excerpt from '../utils/excerpt'

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <div>
      <Introduction />
      <div className="Column">
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return (
              <div className="blog-post-preview" key={post.id}>
                <Header post={post} link={true} />
                <h1>
                  <Link to={post.frontmatter.path}>
                    {post.frontmatter.title}
                  </Link>
                </h1>
                <h2>{post.frontmatter.date}</h2>
                <p>{excerpt(post.html)}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            tags
            date(formatString: "MMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`
