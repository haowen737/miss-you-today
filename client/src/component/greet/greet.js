import React, { Component } from 'react'
import GreetContent from './../greetContent/GreetContent'
import GreetFlower from './../greetFlower/GreetFlower'
import GreetHeader from './../greetHeader/GreetHeader';

import { Hero } from './Hero.service'

import './Greet.css'

export default class Greet extends Component {
  constructor () {
    super()
    this.state = {
      heroIndex: 0
    }
  }
  componentDidMount() {
    this.typeWriterProcess()
  }
  componentWillUnmount() {
    clearTimeout(this.writeText)
    clearTimeout(this.ereaseText)
    console.log(this.writeText, '！！清除typewriter定时器')
  }
  typeWriterProcess () {
    this.writeText = setTimeout(() => {
      this.greetContent.typeWriter(1)
    }, 2000)
    this.ereaseText = setTimeout(() => {
      this.greetContent.typeWriter(0)
      this.typeWriterProcess()
      this.indexManager()
    }, 7000 )
  }
  indexManager () {
    this.setState((prev) => ({
      heroIndex: prev.heroIndex > 2 ? 0 : prev.heroIndex + 1
    }))
  }
  render() {
    const { heroIndex } = this.state
    const hero = Hero[heroIndex]
    return (
      <div className="greet-container" style={{backgroundColor: hero.theme}}>
        <GreetHeader theme={hero.headerTheme}></GreetHeader>
        <div className="greet-flower-layout">
          <GreetFlower
          theme={hero.headerTheme}
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
