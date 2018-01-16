import React, { Component } from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'
import { Link } from 'react-router-dom'

const defaultStyle = {
  transition: `all 600ms ease`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 0, transform: `translate3d(30%, 0, 0)` },
  entered: { opacity: 1, transform: `translate3d(0, 0, 0)` }
}

const TagList = ({ tags }) => (
  <div className="taglist-container">
    <i className="iconfont">&#xe61f;</i>
    <div className="tag-list">
      <TransitionGroup>
        {
          tags && tags.split(',').map((t, index) => (
            <Transition key={index} in={true} appear={true} timeout={(100 + (100 * index))}>
              {(state) => (
                <Link
                style={{
                  ...defaultStyle,
                  ...{transform: `translate3d(${index * 10}%, 0, 0)`},
                  ...transitionStyles[state]
                }}
                to='/'>
                  {t}
                </Link>
              )}
            </Transition>
          ))
        }
      </TransitionGroup>
    </div>
  </div>
)

export default class BlogArticleFooter extends Component {
  render() {
    const { data } = this.props
    console.log(data)
    return (
      <div className="blog-article-footer">
        <TagList
          tags={data.tags}
        />
      </div>
    )
  }
}
