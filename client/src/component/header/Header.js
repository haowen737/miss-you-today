import React, { Component } from 'react'
import './Header.css'

const nav = [{
  title: '博客',
  url: '/blog',
  target: ''
}, {
  title: '关于我',
  url: '/me',
  target: ''
}, {
  title: 'Github',
  url: 'https://github.com/haowen737',
  target: '_blank'
}, {
  title: '微博',
  url: 'http://weibo.com/311170900/',
  target: '_blank'
}, {
  title: '知乎',
  url: 'https://zhuanlan.zhihu.com/fe-sketch',
  target: '_blank'
}, {
  title: '聊天室',
  url: 'https://discord.gg/HcvpmuK',
  target: '_blank'
}]

const Logo = function (props) {
  return <a className="logo" style={{color: props.color}}>Haowen</a>
}

const NavInner = function (props) {
  return nav.map((n, i) => (
    <a key={i} style={{color: props.color}}>{n.title}</a>
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
