import React, { Component } from 'react'
import Axios from 'axios'
import { Transition, TransitionGroup } from 'react-transition-group'

const Article = ({ children }) => {
  return (
    <div>{children}</div>
  )
}

const defaultStyle = {
  transition: `all 600ms ease-in-out`,
  transform: `translate3d(-20px, 0, 0)`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0, transform: `translate3d(-20px, 0, 0)` },
  entered:  { opacity: 1, transform: `translate3d(-50px, 0, 0)` },
};

export default class ArticleList extends Component {
  constructor () {
    super()
    this.state = {
      articleList: []
    }
  }
  componentWillReceiveProps ({ activeTag }) {
    this.getArticles(activeTag)
  }
  getArticles (activeTag) {
    Axios
      .get('/api/article/getTags/' + activeTag)
      .then(({ data }) => {
        this.setState({ articleList: data })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    const { articleList } = this.state
    const { activeTag } = this.props
    return (
      <div className="article-list-container">
        <Transition in={true} appear={true} timeout={600}>
          {
            (state) => (
              <header style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>{ activeTag }</header>
            )
          }
        </Transition>
        <ul className="article-list">
          {
            articleList.map((article) => (
              <Article>
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
