import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { themeChange } from '../../actions'
import { BlogTheme } from '../../Hero.service'

import './Nomatch.css'

class Nomatch extends Component {
  componentDidMount () {
    this.props.themeChange(BlogTheme)
  }
  render() {
    return (
      <div className="nomatch-layout">
        <div className="nomatch-body">
          <p>404</p>
          <p>Oops... looks like you got lost</p>
          <Link to="/">Take me back</Link>
        </div>
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
)(Nomatch)
