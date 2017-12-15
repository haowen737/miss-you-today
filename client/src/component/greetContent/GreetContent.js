import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './GreetContent.css'

const TypeWritter = function ({ color, currName }) {
  return <span className="typeWritter" style={{ color }}>{currName}</span>
}

const StartButton = function ({ color, backgroundColor }) {
  return <Link
  to="/blog"
  className="buttonStyle"
  style={{ color, backgroundColor }}>
    START A TRIP
  </Link>
}

export default class GreetContent extends Component {
  constructor () {
    super()
    this.state = {
      currName: '',
      writingActive: true,
      penIsWriting: false//重写名字中，勿扰
    }
  }
  componentWillUnmount () {
    this.endWriteName()
  }
  pen (name) {
    let index = 0
    let spacing = Math.random() * 120 + 80
    if (!name) { return }
    this.penSelf = setInterval(() => {
      ++index
      this.setState(prev => ({
        penIsWriting: true,
        currName: name.slice(0, index)
      }))
      if (index === name.length) { 
        this.setState({ penIsWriting: false })
        clearInterval(this.penSelf)
      }
    }, spacing)
  }
  erease () {
    const { currName } = this.state
    return new Promise((resolve) => {
      if (currName) {
        let spacing = Math.random() * 120 + 80
        let index = this.state.currName.length
        this.ereaseSelf = setInterval(() => {
          --index
          this.setState(prev => ({
            penIsWriting: true,
            currName: prev.currName.slice(0, index)
          }))
          if (index === 0) {
            resolve()
            this.setState({ penIsWriting: true })
            clearInterval(this.ereaseSelf)
          }
        }, spacing)
      } else { resolve() }
    })
  }
  startRewriteName (currName, name) {
    this.erease().then(() => { this.pen(name) })
  }
  endWriteName (currName, name) {
    this.setState({ writingActive: false })
    clearInterval(this.penSelf)
    clearInterval(this.ereaseSelf)
  }
  shouldReWriteName (theme, currName) {
    // console.log('检车师父需要写入')
    const { writingActive, penIsWriting } = this.state
    if (!writingActive) { return }
    if (currName !== theme.name && !penIsWriting) {
      this.startRewriteName(currName, theme.name)
    }
  }
  render() {

    const { currName } = this.state
    const { theme } = this.props

    this.shouldReWriteName(theme, currName)

    return (
      <div className="contentWrap">
        <p className="herotitle">
          Make it&nbsp;
          <br className="hero-title-br"/>
          <TypeWritter
          currName={currName}
          color={theme.color}></TypeWritter>
        </p>
        <p className="heroSummary">Code · Design · Create · Capture · Inspire</p>
        <StartButton color={theme.btnColor} backgroundColor={theme.btnTheme}></StartButton>
      </div>
    )
  }
}
