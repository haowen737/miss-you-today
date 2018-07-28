import * as React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { createSkeletonProvider, createSkeletonElement } from '@trainline/react-skeletor'

import Utils from '../../utils'

import './BlogArticles.css'

const SkeletorSetting = {
  article: {
    title: '____________________________',
    summary: '______________________________________________________',
    created_at: '____________'
  }
}

interface State {
  articles: any[]
}

interface ActicleProps {
  article: any
  index: number
}

const ArticleSelf = ({ article, index }: ActicleProps) => {
  const Title = createSkeletonElement('h2', 'pending-home')
  const Summary = createSkeletonElement('p', 'pending-home')
  const Date = createSkeletonElement('span', 'pending-home')
  return (
    <Link to={ article.file_id
      ? {
        pathname: '/blog/article',
        search: `id=${article.file_id}` }
      : {
        pathname: '/blog' }
      } className="article">
      <div className="article-header clearfix">
        <Title className="article-title">{article.title}</Title>
        <Date className="article-date">{Utils.DateFormat(article.created_at, 'YYYY-MM-DD hh:mm:ss')}</Date>
      </div>
      <Summary className="article-summary">{article.summary}</Summary>
    </Link>
  )  
}

const Article = createSkeletonProvider(
  SkeletorSetting,
  ({ article }) => article === null
)(ArticleSelf)

export default class BlogArticles extends React.Component<object, State> {
  constructor (props: object) {
    super(props)
    this.state = {
      articles: [null, null, null, null]
    }
  }
  
  componentDidMount () {
    Axios
      .post('/api/jooi/update', { data: {name: '123'} })
    this.getArticles()
  }
  
  getArticles () {
    Axios
      .get('/api/article/getArticles')
      .then(({ data }) => {
        this.setState({ articles: [] })
        setTimeout(() => {
          this.setState({ articles: data })
        }, 0)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  renderArticles () {
    const { articles } = this.state
    return articles.map((a, i) => <Article article={a} key={i} index={i} />)
  }

  render() {
    return (
      <div className="article-list">
      {this.renderArticles()}
      </div>
    )
  }
}
