import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { themeChange } from './../../actions'

import BlogArticles from './../blogArticles/BlogArticles'
import BlogArticle from './../blogArticle/BlogArticle'
import BlogHeader from './../blogHeader/BlogHeader'

import { Theme } from './../../Hero.service'

import './Blog.css'

class Blog extends Component {
  componentDidMount () {
    this.props.themeChange(Theme[4])
  }
  render() {
    return (
      <div className="blog-layout">
        <BlogHeader></BlogHeader>
        <div className="blog-main">
          <Switch>
            <Route path="/blog" exact component={BlogArticles} />
            <Route path="/blog/article" component={BlogArticle} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme
})

const mapDispatchToProps = dispatch => {
  return {
    themeChange: theme => {
      dispatch(themeChange(theme))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
