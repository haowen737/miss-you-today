import React, { Component } from 'react'
import { connect } from 'react-redux'

import GreetContent from './../greetContent/GreetContent'
import GreetFlower from './../greetFlower/GreetFlower'
import GreetHeader from './../greetHeader/GreetHeader';

import { themeChange } from './../../actions'

import { Hero } from './Hero.service'

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
    this.typeWriterProcessWrite()
    this.initTimeout = setTimeout(() => {
      this.typeWriterProcessErease()
      clearTimeout(this.initTimeout)
    }, 5000)
  }
  componentWillUnmount() {
    clearTimeout(this.writeText)
    clearTimeout(this.ereaseText)
    this.initTimeout && clearTimeout(this.initTimeout)
    console.log(this.writeText, this.ereaseText, '！！清除typewriter定时器')
  }
  typeWriterProcess () {
    this.writeText = setTimeout(() => {
      console.log('写入timeout开始执行')
      this.typeWriterProcessWrite()
    }, 2000)
    this.ereaseText = setTimeout(() => {
      console.log('擦除timeout开始执行')
      this.typeWriterProcessErease()
    }, 7000)
  }
  typeWriterProcessWrite () {
    console.log('执行写入')
    this.greetContent && this.greetContent.typeWriter(1)
  }
  typeWriterProcessErease () {
    this.greetContent && this.greetContent.typeWriter(0)
    this.typeWriterProcess()
    this.indexManager()
  }
  indexManager () {
    this.setState((prev) => ({
      heroIndex: prev.heroIndex > 2 ? 0 : prev.heroIndex + 1
    }))
    this.emitThemeChange()
  }
  emitThemeChange () {
    const hero = Hero[this.state.heroIndex]
    // this.props.dispatch(themeChange(hero))
    // this.props.onThemeChange(hero)
  }
  render() {
    const { heroIndex } = this.state
    const { dispatch, theme } = this.props
    const hero = Hero[heroIndex]
    console.log('dispatch', dispatch, this.props)
    return (
      <div className="greet-container" style={{backgroundColor: hero.theme}}>
        <GreetHeader theme={hero.headerTheme}></GreetHeader>
        <div className="greet-flower-layout">
          <GreetFlower
          theme={hero}
          poem={hero.poem}></GreetFlower>
        </div>
        <div className="greet-content-layout">
          <GreetContent
          hero={hero}
          ref={(c) => { this.greetContent = c; }}></GreetContent>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    theme: state => state.theme
  }
}

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
