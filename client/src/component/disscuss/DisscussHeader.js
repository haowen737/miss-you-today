import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const navList = [{
  name: '首页',
  to: '/'
}, {
  name: '博客',
  to: '/blog'
}]

export default class DisscussHeader extends Component {
  render() {
    return (
      <div className="disscuss-header">
        <h1>有没有兴趣一起做白日梦呀</h1>
        <nav className="disscuss-nav">
          {
            navList.map((nav, i) => (
              <Link to={nav.to} key={i}>{nav.name}</Link>
            ))
          }
        </nav>
      </div>
    )
  }
}
