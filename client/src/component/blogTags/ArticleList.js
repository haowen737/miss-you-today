import React, { Component } from 'react'
import Axios from 'axios'
import { Transition, TransitionGroup } from 'react-transition-group'

import { defaultStyle, transitionStyles } from './TransitionConfig'

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
    console.log(articleListIn)
    return (
      <div className="article-list-container">
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
                    <p>{article.created_at}</p>
                  </div>
                  <div className="article-right">
                    <h2>{article.title}</h2>
                  </div>
                </div>
              </Article>
            ))
          }
        </ul>
      </div>
    )
  }
}
