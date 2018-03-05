import React, { Component } from 'react'
import { connect } from 'react-redux';
import { themeChange } from './../../actions'
import { BlogTheme } from './../../Hero.service'

import './me.css'

const Window = () => {
  return (
    <div className="window">Haowen</div>
  )
}

class Me extends Component {
  componentDidMount () {
    this.props.themeChange(BlogTheme)
  }
  
  render() {
    return (
      <div>
        <Window></Window>
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
)(Me)