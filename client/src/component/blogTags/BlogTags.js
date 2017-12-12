import React, { Component } from 'react'
import Axios from 'axios'
import { Transition, TransitionGroup } from 'react-transition-group'

import './BlogTags.css'

const defaultStyle = {
  transition: `all 300ms ease`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 0, transform: `translate3d(0, -30%, 0)` },
  entered: { opacity: 1, transform: `translate3d(0, 0, 0)` }
}

const Tag = ({ children, index, tag }) => {
  return (
    <Transition in={true} appear={true} timeout={(50 + (50 * index))}>
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

export default class BlogTags extends Component {
  constructor () {
    super()
    this.state = {
      tags: []
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
          this.setState({ tags: data })
        }, 0)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    const { tags } = this.state
    return (
      <ul className="tags-list">
      <TransitionGroup>
          {
            tags.map((tag, i) => (
              <Tag tag={tag} index={i}>{tag}</Tag>
            ))
          }
        </TransitionGroup>
      </ul>
    )
  }
}
