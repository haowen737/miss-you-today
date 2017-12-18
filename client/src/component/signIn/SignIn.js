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
    user
    ? (
      <Transition in={greetIn} appear={true} timeout={500}>
      {(state) => (
        <div
        className="disscuss-item"
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
          <div className="signin-greet">welcome, {user.nick_name}</div>
          <a onClick={history.goBack}>Click Here to Return</a>
        </div>
      )}
      </Transition>
    ) : null
  )
}

class SignIn extends Component {
  constructor () {
    super()
    this.state = {
      formType: 'signIn'
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
  render() {
    const { formType } = this.state
    const { history, user } = this.props
    console.log(user)
    return (
      <div className="signin-container">
        <NavBack history={history} />
        <SignInHeader />
        <div className="signin-form-container">
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

