import React, { Component } from 'react'
import Axios from 'axios'
import { Transition } from 'react-transition-group'

import { defaultStyle, transitionStyles } from './TransitionConfig'
import Utils from './../../utils'

const Article = ({ children, index, article, articleListIn }) => {
  return (
    <Transition in={articleListIn} appear={true} timeout={(50 + (50 * index))}>
    {(state) => (
      <li 
      style={{
        ...defaultStyle,
        ...{transform: `translate3d(0, -${index * 10}%, 0)`},
        ...transitionStyles[state]
      }}>
        {children}
      </li>
    )}
  </Transition>
  )
}

const ListSelf = ({ articleList, articleListIn }) => (
  <ul className="article-list">
  {
    articleList.map((article, i) => (
      <Article
      key={i}
      article={article}
      articleListIn={articleListIn}
      index={i}>
        <div className="article-card clearfix">
          <div className="article-left">
            <p>{Utils.DateFormat(article.created_at, 'YYYY-MM-DD hh:mm:ss')}</p>
          </div>
          <div className="article-right">
            <h2>{article.title}</h2>
          </div>
        </div>
      </Article>
    ))
  }
  </ul>
)

const EmptyList = () => (
  <div className="empty-list">搜索中...</div>
)

export default class ArticleList extends Component {
  constructor () {
    super()
    this.state = {
      articleList: [],
      articleListIn: false
    }
  }
  componentWillReceiveProps ({ activeTag }) {
    this.setState({ articleListIn: false })
    this.getArticles(activeTag)
  }
  getArticles (activeTag) {
    Axios
      .get('/api/article/getTags/' + activeTag)
      .then(({ data }) => {
        this.setState({ articleList: data })
        setTimeout(() => {
          this.setState({ articleListIn: true })
        }, 600);
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    const { articleList, articleListIn } = this.state
    return (
      <div className="article-list-container">
      {
        articleList.length
        ? <ListSelf articleList={articleList} articleListIn={articleListIn} />
        : <EmptyList />
      }
      </div>
    )
  }
}
