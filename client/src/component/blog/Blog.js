import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import BlogArticles from './../blogArticles/BlogArticles'
import BlogArticle from './../blogArticle/BlogArticle'
import BlogHeader from './../blogHeader/BlogHeader'

import './Blog.css'

export default class Blog extends Component {
  render() {
    return (
      <div className="blog-layout">
        <BlogHeader></BlogHeader>
        <div className="blog-main">
          <Switch>
            <Route path="/blog" exact component={BlogArticles} />
            <Route path="/blog/article/" component={BlogArticle} />
          </Switch>
        </div>
      </div>
    )
  }
}
