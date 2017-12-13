import React, { Component } from 'react'
import Axios from 'axios'
import { Transition, TransitionGroup } from 'react-transition-group'

import ArticleList from './ArticleList'

import './BlogTags.css'

const defaultStyle = {
  transition: `all 300ms ease`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 0, transform: `translate3d(0, -30%, 0)` },
  entered: { opacity: 1, transform: `translate3d(0, 0, 0)` }
}

const Tag = ({ children, index, tag, activeTag, onClickTag }) => {
  console.log(activeTag)
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
      activeTag: ''
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
    this.setState({ activeTag: tag })
  }
  render() {
    const { tags, activeTag } = this.state
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
        <ArticleList activeTag={activeTag}></ArticleList>
      </div>
    )
  }
}
