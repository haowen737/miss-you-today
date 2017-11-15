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
    return (
      <div className="container" style={{backgroundColor: Hero[this.state.heroIndex].theme}}>
        <Header theme={Hero[this.state.heroIndex].headerTheme}></Header>
        <div className="asideStyle">
          <GreetFlower theme={Hero[this.state.heroIndex].headerTheme}></GreetFlower>
        </div>
        <div className="content">
          <GreetContent
          hero={Hero[this.state.heroIndex]}
          action={this.state.action}
          ref={(c) => { this.greetContent = c; }}></GreetContent>
        </div>
      </div>
    )
  }
}
