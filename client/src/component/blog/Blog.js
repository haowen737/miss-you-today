import React, { Component } from 'react'
import BlogArticles from './../blogArticles/BlogArticles'

export default class Blog extends Component {
  render() {
    return (
      <div className="blog-layout">
        <BlogArticles></BlogArticles>
      </div>
    )
  }
}
