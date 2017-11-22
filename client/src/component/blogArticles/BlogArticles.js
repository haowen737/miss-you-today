import React, { Component } from 'react'
import Axios from 'axios';
import { createSkeletonProvider, createSkeletonElement } from '@trainline/react-skeletor';

import './BlogArticles.css'

const articleSkeleton = ({ article, index }) => {
  const Title = createSkeletonElement('h2', 'pending-home')
  const Summary = createSkeletonElement('p', 'pending-home')
  const Date = createSkeletonElement('span', 'pending-home')
  return (
    <div className="article">
      <div className="article-header clearfix">
        <Title className="article-title">{article.title}</Title>
        <Date className="article-date">{article.created_at}</Date>
      </div>
      <Summary className="article-summary">{article.summary}</Summary>
    </div>
  )  
}

const Article = createSkeletonProvider(
    {
      article: {
        title: '____________________________',
        summary: '______________________________________________________',
        created_at: '____________'
      }
    },
    ({ article }) => article === null
  )(articleSkeleton)

export default class BlogArticles extends Component {
  constructor () {
    super()
    this.state = {
      articles: [null, null, null, null]
    }
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({ articles: [] })
      this.getArticles()
    }, 2000)
  }
  getArticles () {
    Axios
      .get('/api/article/getArticles')
      .then(({ data }) => {
        this.setState({ articles: data })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    const { articles } = this.state
    return (
      <div className="article-list">
      {
        articles.map((a, i) => (
          <Article article={a} key={i} index={i}></Article>
        ))
      }
      </div>
    )
  }
}
