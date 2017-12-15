import React, { Component } from 'react'
import { connect } from 'react-redux';
import { themeChange } from './../../actions'
import { BlogTheme } from './../../Hero.service'

class Me extends Component {
  componentDidMount () {
    this.props.themeChange(BlogTheme)
  }
  
  render() {
    return (
      <div>
        this is me
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