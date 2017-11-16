import React, { Component } from 'react'
import GreetContent from './../greetContent/GreetContent'
import GreetFlower from './../greetFlower/GreetFlower'
import Header from './../header/Header';
import { Hero } from './Hero.service'
import './Greet.css'

export default class Greet extends Component {
  constructor () {
    super()
    this.state = {
      heroIndex: 0,
      action: 0
    }
  }
  componentDidMount() {
    this.typeWriterProcess()
  }
  componentWillUnmount() {
  }
  typeWriterProcess () {
    setTimeout(() => {
      this.greetContent.typeWriter(1)
    }, 2000)
    setTimeout(() => { 
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
    const { action, heroIndex } = this.state
    const hero = Hero[heroIndex]
    return (
      <div className="container" style={{backgroundColor: hero.theme}}>
        <Header theme={hero.headerTheme}></Header>
        <div className="asideStyle">
          <GreetFlower
          theme={hero.headerTheme}
          poem={hero.poem}></GreetFlower>
        </div>
        <div className="content">
          <GreetContent
          hero={hero}
          action={action}
          ref={(c) => { this.greetContent = c; }}></GreetContent>
        </div>
      </div>
    )
  }
}
