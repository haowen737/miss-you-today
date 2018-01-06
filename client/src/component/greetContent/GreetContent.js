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
  pen (nextName) {
    let index = 1
    let spacing = Math.random() * 120 + 50
    if (!nextName) { return }
    this.penSelf = setInterval(() => {
      this.executePen(index, nextName)
      index++
    }, spacing)
  }
  executePen (index, nextName) {
    this.setState(prev => ({
      penIsWriting: true,
      currName: nextName.slice(0, index)
    }))
    if (index === nextName.length) { 
      this.setState({ penIsWriting: false })
      clearInterval(this.penSelf)
      console.log('写入动作完成')
    }
  }
  erease () {
    const { currName } = this.state
    return new Promise((resolve) => {
      if (currName) {
        this.executeErease(resolve, currName)
      } else { resolve() }
    })
  }
  executeErease (resolve, currName) {
    let spacing = Math.random() * 120 + 50
    let index = currName.length
    this.ereaseSelf = setInterval(() => {
      --index
      this.setState(prev => ({
        penIsWriting: true,
        currName: prev.currName.slice(0, index)
      }))
      if (index === 0) {
        resolve()
        this.setState({ penIsWriting: true })
        console.log('擦除动作完成')
        clearInterval(this.ereaseSelf)
      }
    }, spacing)
  }
  startRewriteName (currName, nextName) {
    this.erease().then(() => { this.pen(nextName) })
  }
  endWriteName (currName, name) {
    this.setState({ writingActive: false })
    clearInterval(this.penSelf)
    clearInterval(this.ereaseSelf)
    console.log('写入动作完成')
  }
  shouldReWriteName (theme, currName) {
    const { writingActive, penIsWriting } = this.state
    if (!writingActive) { return }
    if (currName !== theme.name && !penIsWriting) {
      console.log('开始重新写入')
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
