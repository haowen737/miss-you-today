import React, { Component } from 'react'
import { Transition } from 'react-transition-group'
import { connect } from 'react-redux'
import Axios from 'axios'

import { themeChange, updateUser } from './../../actions'
import { BlogTheme } from './../../Hero.service'

import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

import { defaultStyle, transitionStyles } from './TransitionConfig'
import './SignIn.css'

const SignInHeader = () => (
  <div className="signin-header">With You Friends</div>
)

const NavBack = ({ history }) => {
  return (
    <a className="signin-navback" onClick={history.goBack}>
      <i className="iconfont">&#xe608;</i>
      Back To Review
    </a>
  )
}

const Greet = ({ greetIn, user, history }) => {
  return (
    greetIn
    ? (
      <Transition in={greetIn} appear={true} timeout={500}>
      {(state) => (
        <div
        className="signin-greet-container"
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
          <div className="signin-greet">😌好久不见，{user.nick_name}</div>
          <a onClick={history.goBack}>点这里可以返回上一个页面</a>
        </div>
      )}
      </Transition>
    ) : null
  )
}

const Notice = ({ onNoticeConfirmed, noticeFormIn }) => (
  <Transition in={noticeFormIn} appear={true} timeout={500}>
  {(state) => (
    <div
    className="signin-notice"
    style={{
      ...defaultStyle,
      ...transitionStyles[state]
    }}>
      <div className="signin-notice-icon">
        Hi！你好哇，记录一下你的名字才可以继续刚才的动作
      </div>
      <p></p>
      <a onClick={onNoticeConfirmed}>知道啦</a>
    </div>
  )}
  </Transition>
)

class SignIn extends Component {
  constructor () {
    super()
    this.state = {
      formType: 'notice'
    }
  }
  componentDidMount () {
    this.props.themeChange(BlogTheme)
  }
  onFormSubmited (type, user) {
    console.log('onFormSubmit---', user)
    // type:0 未注册，1：已登录
    this.setState({ formType: type })
    this.props.updateUser(user)
  }
  onNoticeConfirmed () {
    this.setState({ formType: 'signIn' })
  }
  render() {
    const { formType } = this.state
    const { history, user } = this.props
    console.log(user)
    return (
      <div className="signin-container">
        <NavBack history={history} />
        <SignInHeader />
        <div className="signin-form-container">
          <Notice noticeFormIn={formType === 'notice'} onNoticeConfirmed={this.onNoticeConfirmed.bind(this)} />
          <SignInForm signInFormIn={formType === 'signIn'} onFormSubmited={this.onFormSubmited.bind(this)} />
          <SignUpForm signUpFormIn={formType === 'signUp'} user={user} onFormSubmited={this.onFormSubmited.bind(this)} />
          <Greet greetIn={formType === 'greet'} user={user} history={history} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    themeChange: theme => {
      dispatch(themeChange(theme))
    },
    updateUser: user => {
      dispatch(updateUser(user))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)

