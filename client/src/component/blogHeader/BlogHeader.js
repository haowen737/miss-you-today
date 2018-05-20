import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Transition, TransitionGroup } from 'react-transition-group'

import NavService from './Nav.Service'

import './BlogHeader.css'

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

const Nav = ({ children, index, data }) => {
  return (
    <Transition in={true} appear={true} timeout={(100 + (100 * index))}>
      {(state) => (
        <Link 
        style={{
          ...defaultStyle,
          ...{transform: `translate3d(${index * 10}%, 0, 0)`},
          ...transitionStyles[state]
        }}
        to={data.to}>
          {children}
        </Link>
      )}
    </Transition>
  )
}

export default class BlogHeader extends Component {
  constructor () {
    super()
    this.state = {
    }
  }
  render() {
    return (
      <div className="blog-header-layout">
        <Logo></Logo>
        <nav className="blogheader-nav">
          <TransitionGroup>
            {
              NavService.map((n, i) => (
                <Nav key={i} index={i} data={n}>{n.name}</Nav>
              ))
            }
          </TransitionGroup>
        </nav>
      </div>
    )
  }
}
