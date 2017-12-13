import React, { Component } from 'react'
import Axios from 'axios'
import { Transition, TransitionGroup } from 'react-transition-group'

import ArticleList from './ArticleList'

import { defaultStyle, transitionStyles, defaultHeaderStyle, transitionHeaderStyles } from './TransitionConfig'

import './BlogTags.css'

const Tag = ({ children, index, tag, activeTag, onClickTag }) => {
  return (
    <Transition in={true} appear={true} timeout={(50 + (50 * index))}>
    {(state) => (
      <li 
      style={{
        ...defaultStyle,
        ...{transform: `translate3d(0, -${index * 10}%, 0)`},
        ...transitionStyles[state]
      }}
      className={tag === activeTag ? `tag-active` : ''}
      onClick={onClickTag}>
        {children}
      </li>
    )}
  </Transition>
  )
}

export default class BlogTags extends Component {
  constructor () {
    super()
    this.state = {
      tags: [],
      activeTag: '',
      activeTagIn: true
    }
  }
  componentWillMount () {
    this.getTags()
  }
  getTags () {
    Axios
      .get('/api/article/getTags')
      .then(({ data }) => {
        this.setState({ tags: [] })
        setTimeout(() => {
          this.setState({ tags: data, activeTag: data[0] })
        }, 0)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  onClickTag (tag) {
    // 首先清空activeTag，触发离场动画
    this.setState({ activeTagIn: false })
    setTimeout(() => {
      this.setState({ activeTag: tag, activeTagIn: true })
    }, 400)
  }
  render() {
    const { tags, activeTag, activeTagIn } = this.state
    return (
      <div className="tags-container">
        <ul className="tags-list">
          <TransitionGroup>
              {
                tags.map((tag, i) => (
                  <Tag
                  key={i}
                  tag={tag}
                  index={i}
                  activeTag={activeTag}
                  onClickTag={this.onClickTag.bind(this, tag)}
                  >{tag}</Tag>
                ))
              }
            </TransitionGroup>
        </ul>
        <Transition in={activeTagIn} appear={true} timeout={300}>
          {
            (state) => (
              <header
              className="article-list-header"
              style={{
                ...defaultHeaderStyle,
                ...transitionHeaderStyles[state]
              }}>{ activeTag }</header>
            )
          }
        </Transition>
        <ArticleList activeTag={activeTag}></ArticleList>
      </div>
    )
  }
}
