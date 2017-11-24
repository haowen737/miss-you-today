import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

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

const Nav = ({ children, ...props }) => {
  console.log(children, {...props})
  return (
    <CSSTransition
      {...props}
      classNames="fade"
    >
      {children}
    </CSSTransition>
  )
}

export default class BlogHeader extends Component {
  constructor () {
    super()
    this.state = {
      navIn: false
    }
  }
  // componentDidMount () {
  //   setInterval(() => {
  //     this.setState({ navIn: !this.state.navIn })
  //   }, 2000)
  // }
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
                <Nav key={n} appear={true} timeout={(100 + (500 * i))}>
                  <a>{n}</a>
                </Nav>
              ))
            }
          </TransitionGroup>
        </nav>
      </div>
    )
  }
}
