import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Transition, TransitionGroup } from 'react-transition-group'

import './BlogHeader.css'

const navService = [
  '标签',
  '收藏',
  '留言',
  '关于我'
]

const Logo = (props) => (
  <Link className="logo" to="/" style={{color: props.color}}>withyoufriends</Link>
)

const defaultStyle = {
  transition: `all 600ms ease`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 0, transform: `translate3d(30%, 0, 0)` },
  entered: { opacity: 1, transform: `translate3d(0, 0, 0)` }
}

const Nav = ({ children, index }) => {
  return (
    <Transition in={true} appear={true} timeout={(100 + (100 * index))}>
      {(state) => (
        <a style={{
          ...defaultStyle,
          ...{transform: `translate3d(${index * 10}%, 0, 0)`},
          ...transitionStyles[state]
        }}>
          {children}
        </a>
      )}
    </Transition>
  )
}

export default class BlogHeader extends Component {
  constructor () {
    super()
    this.state = {
      navIn: false
    }
  }
  render() {
    const { navIn } = this.state
    console.log(navIn)
    return (
      <div className="blog-header-layout">
        <Logo></Logo>
        <nav className="blogheader-nav">
          <TransitionGroup>
            {
              navService.map((n, i) => (
                <Nav key={n} index={i}>{n}</Nav>
              ))
            }
          </TransitionGroup>
        </nav>
      </div>
    )
  }
}
