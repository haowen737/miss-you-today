import React, { Component } from 'react'
// import { Transition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import Axios from 'axios'

import { themeChange } from './../../actions'
import { BlogTheme } from './../../Hero.service'

import './SignIn.css'

const SignInHeader = () => (
  <div className="signin-greet">With You Friends</div>
)

const NavBack = ({ history }) => {
  return (
    <a className="signin-navback" onClick={history.goBack}>
      <i className="iconfont">&#xe608;</i>
      Back To Review
    </a>
  )
}

const NavNext = () => {
  return (
    <a className="signin-navnext">下一步</a>
  )
}

const MailInput = () => (
  <div className="mail-input-container">
    <i className="iconfont">&#xe69f;</i>
    <input placeholder="Email"></input>
  </div>
)

class SignIn extends Component {
  componentDidMount () {
    this.props.themeChange(BlogTheme)
  }
  render() {
    console.log(this.props)
    const { history } = this.props
    return (
      <div className="signin-container">
        <NavBack history={history} />
        <SignInHeader />
        <MailInput />
        <NavNext />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme
})

const mapDispatchToProps = dispatch => {
  return {
    themeChange: theme => {
      dispatch(themeChange(theme))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)

