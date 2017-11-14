import React, { Component } from 'react'
import './GreetFlower.css'
import CampFire from './../campFire/CampFire'

const scence = function () {
  return (
    <div>
      <div className="dragon"></div>
      <div className="farmer"></div>
    </div>
  )
}
export default class GreetFlower extends Component {
  render() {
    return (
      <div className="greet-flower">
        <CampFire></CampFire>
      </div>
    )
  }
}
