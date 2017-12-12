import React, { Component } from 'react'
import './GreetContent.css'

const TypeWritter = function ({ color, currName }) {
  console.log(currName)
  return <span className="typeWritter" style={{ color }}>{currName}</span>
}

const StartButton = function ({ color, backgroundColor }) {
  return <a className="buttonStyle" style={{ color, backgroundColor }}>START A TRIP</a>
}

export default class GreetContent extends Component {
  constructor () {
    super()
    this.state = {
      currName: '',
      penIsWriting: false//重写名字中，勿扰
    }
  }
  pen (name) {
    console.log('开始写入')
    if (!name) return
    let index = 0
    let spacing = Math.random() * 100 + 50
    let penSelf = setInterval(() => {
      ++index
      this.setState(prev => ({
        penIsWriting: true,
        currName: name.slice(0, index)
      }))
      if (index === name.length) { 
        this.setState({ penIsWriting: false })
        clearInterval(penSelf)
      }
    }, spacing)
  }
  erease () {
    console.log('开始擦除')
    return new Promise((resolve, reject) => {
      const { currName } = this.state
      if (!currName) { resolve(); return }
      let spacing = Math.random() * 100 + 50
      let index = this.state.currName.length
      let ereaseSelf = setInterval(() => {
        --index
        this.setState(prev => ({
          penIsWriting: true,
          currName: prev.currName.slice(0, index)
        }))
        if (index === 0) {
          resolve()
          this.setState( { penIsWriting: true })
          clearInterval(ereaseSelf)
        }
      }, spacing)
    })
  }
  startRewriteName (currName, name) {
    this.erease().then(() => { this.pen(name) })
  }
  shouldReWriteName (theme, currName) {
    if (currName !== theme.name && !this.state.penIsWriting) {
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
