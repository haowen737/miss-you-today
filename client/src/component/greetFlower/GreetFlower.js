import React, { Component } from 'react'
import FadeListService from './FadeList.service'
import './GreetFlower.css'

const fadeListStyle = function (i, props) {
  return {
    opacity: 1 / (i + 1),
    color: props.theme,
    animationDelay: `${i * 0.2}s`
  }
}

const FadeList = function (props) {
  const length = FadeListService.length
  const listFrag = FadeListService.map((i, index) => 
    <li style={fadeListStyle(index, props)} key={index}>{i}</li>
  )
  return listFrag
}

export default class GreetFlower extends Component {
  constructor () {
    super()
  }
  render() {
    return (
      <div className="greet-flower">
        <ul className="fade-list">
          <FadeList theme={this.props.theme}></FadeList>
        </ul>
      </div>
    )
  }
}
