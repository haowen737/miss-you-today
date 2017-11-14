import React, { Component } from 'react'
import './Header.css'

const Logo = function (props) {
  return <a className="logo" style={{color: props.color}}>Haowen</a>
}

export default class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <Logo color={this.props.theme}></Logo>
      </div>
    )
  }
}
