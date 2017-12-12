import React, { Component } from 'react'
import { connect } from 'react-redux'

import GreetContent from './../greetContent/GreetContent'
import GreetFlower from './../greetFlower/GreetFlower'
import GreetHeader from './../greetHeader/GreetHeader';

import { themeChange } from './../../actions'

import { Theme } from './../../Hero.service'

import './Greet.css'

class Greet extends Component {
  constructor () {
    super()
    this.state = {
      heroIndex: 0
    }
  }
  componentDidMount() {
    this.emitThemeChange()
    this.greetMan = setInterval(this.indexManager.bind(this), 5000)
  }
  componentWillUnmount() {
    this.greetMan && clearInterval(this.indexManager.bind(this))
  }
  indexManager () {
    this.setState((prev) => {
      const currIndex = prev.heroIndex > 2 ? 0 : prev.heroIndex + 1
      this.emitThemeChange(currIndex)
      return {
        heroIndex: currIndex
      }
    })
  }
  emitThemeChange (index) {
    const hero = Theme[index || 0]
    this.props.themeChange(hero)
  }
  render() {
    const { dispatch, theme } = this.props
    console.log('dispatch', theme)
    return (
      <div className="greet-container" style={{backgroundColor: theme.theme}}>
        <GreetHeader theme={theme.headerTheme}></GreetHeader>
        <div className="greet-flower-layout">
          <GreetFlower
          theme={theme}
          poem={theme.poem}></GreetFlower>
        </div>
        <div className="greet-content-layout">
          <GreetContent
          theme={theme}
          ref={(c) => { this.greetContent = c; }}></GreetContent>
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
)(Greet)
// export default Greet
