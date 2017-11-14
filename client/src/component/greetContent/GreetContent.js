import React, { Component } from 'react'
import './GreetContent.css'

const Adjectives = function (props) {
  return <span className="adjectives" style={{color: props.color}}>{props.name}</span>
}

const StartButton = function (props) {
  return <a className="buttonStyle" style={{color: props.color, backgroundColor: props.theme}}>START A TRIP</a>
}

export default class GreetContent extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      color: '',
      btnTheme: '',
      btnColor: '',
    }
  }
  componentDidMount () {
    this.fillFontColor()
  }
  typeWriter (action) {
    // type0时擦除，1时写入
    const name = this.props.hero.name
    let index = action ? 0 : name.length
    let timerTyper = setInterval(() => {
      this.setState({
        name: name.slice(0, index)
      })
      if (index === (action ? name.length : 0)) {
        console.log(`${['擦除', '写入'][action]}定时器已清除`);
        clearInterval(timerTyper)
        this.fillFontColor()
      }
      action ? index++ : index--
    }, 70 + Math.random() * 100)
  }
  fillFontColor () {
    this.setState({
      color: this.props.hero.color,
      btnTheme: this.props.hero.btnTheme,
      btnColor: this.props.hero.btnColor
    })
  }
  render() {
    return (
      <div className="contentWrap">
        <p className="herotitle">
          Make it&nbsp;
          <Adjectives
          name={this.state.name}
          color={this.state.color}></Adjectives>
        </p>
        <p className="heroSummary">Code · Design · Create · Capture · Inspire</p>
        <StartButton color={this.state.btnColor} theme={this.state.btnTheme}></StartButton>
      </div>
    )
  }
}
