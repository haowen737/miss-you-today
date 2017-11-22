import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

import nav from './Nav.service'

const Logo = function (props) {
  return <Link className="logo" to="/" style={{color: props.color}}>Haowen</Link>
}

const NavInner = function (props) {
  return nav.map((n, i) => (
    <Link key={i} to="/blog" style={{color: props.color}}>{n.title}</Link>
  ))
}

export default class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <Logo color={this.props.theme}></Logo>
        <nav className="nav">
          <NavInner color={this.props.theme}></NavInner>
        </nav>
      </div>
    )
  }
}
