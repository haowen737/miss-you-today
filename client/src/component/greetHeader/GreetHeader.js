import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './GreetHeader.css'

import GreetNav from './GreetNav.service'

const Logo = function (props) {
  return <Link className="logo" to="/" style={{color: props.color}}>Haowen</Link>
}

const Nav = function (props) {
  return GreetNav.map((n, i) => (
    <Link key={i} to="/blog" style={{color: props.color}}>{n.title}</Link>
  ))
}

export default class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <Logo color={this.props.theme}></Logo>
        <nav className="nav">
          <Nav color={this.props.theme}></Nav>
        </nav>
      </div>
    )
  }
}
