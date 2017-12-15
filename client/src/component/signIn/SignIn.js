import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Transition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import Axios from 'axios'

import { themeChange } from './../../actions'
import { BlogTheme } from './../../Hero.service'

const SignInHeader = () => (
  <div>this is sign in</div>
)

class SignIn extends Component {
  componentDidMount () {
    this.props.themeChange(BlogTheme)
  }
  render() {
    return (
      <div className="signin-container">
        <SignInHeader></SignInHeader>
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

