import * as React from 'react'
import { Link } from 'react-router-dom'
import './GreetHeader.css'

import { Theme } from '@types'
import GreetNav from './GreetNav.service'

interface Props {
  theme: Theme
}

export default class Header extends React.Component<Props> {
  renderLogo = () => {
    const theme = this.props.theme
    return <Link className="logo" to="/" style={{ color: theme.color }}>Haowen</Link>
  }

  renderNav = () => {
    const theme = this.props.theme
    return (
      GreetNav.map((n, i) => (
        <Link key={i} to={n.url} style={{color: theme.color}}>{n.title}</Link>
      ))
    )
  }
  
  render() {
    return (
      <div className="header-container">
        {this.renderLogo()}
        <nav className="nav">
          {this.renderNav()}
        </nav>
      </div>
    )
  }
}
