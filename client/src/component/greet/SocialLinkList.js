import React, { Component } from 'react'

export default class SocialLinkList extends Component {
  renderStyle (i) {
    return { animationDuration: `${i}ms` }
  }
  onClickSocial (i) {
    const targets = [
      'https://weibo.com/311170900/',
      'https://zhuanlan.zhihu.com/fe-sketch',
      'https://github.com/haowen737',
      'https://codepen.io/hi_haowen/',
      'https://www.instagram.com/hi_haowen/',
      'https://500px.com/Haowen'
    ]
    window.open(targets[i])
  }
  render() {
    const { theme } = this.props
    return (
      <div className="sociallink-list-container" style={{color: theme.color}}>
        <i className="iconfont" style={this.renderStyle(600)} onClick={() => { this.onClickSocial(0) }}>&#xe611;</i>
        <i className="iconfont" style={this.renderStyle(800)} onClick={() => { this.onClickSocial(1) }}>&#xe619;</i>
        <i className="iconfont" style={this.renderStyle(1100)} onClick={() => { this.onClickSocial(2) }}>&#xe600;</i>
        <i className="iconfont" style={this.renderStyle(1100)} onClick={() => { this.onClickSocial(3) }}>&#xe9eb;</i>
        <i className="iconfont" style={this.renderStyle(1500)} onClick={() => { this.onClickSocial(4) }}>&#xe7b0;</i>
        <i className="iconfont" style={this.renderStyle(2000)} onClick={() => { this.onClickSocial(5) }}>&#xe604;</i>
      </div>
    )
  }
}
