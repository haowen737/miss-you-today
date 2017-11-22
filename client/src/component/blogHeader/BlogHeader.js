import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './BlogHeader.css'

const Logo = function (props) {
  return <Link className="logo" to="/" style={{color: props.color}}>withyoufriends</Link>
}

export default class BlogHeader extends Component {
  render() {
    return (
      <div className="blog-header-layout">
        <Logo></Logo>
      </div>
    )
  }
}
