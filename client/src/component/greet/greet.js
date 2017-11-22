import React, { Component } from 'react'
import GreetContent from './../greetContent/GreetContent'
import GreetFlower from './../greetFlower/GreetFlower'

import { Hero } from './Hero.service'

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
    console.log('！！清除所有定时器')
    this.emitHeroChange({ theme: '#fff', headerTheme: '#333' })
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
    this.emitHeroChange()
  }
  emitHeroChange (defaultHero) {
    const { heroIndex } = this.state
    const hero = Hero[heroIndex]
    this.props.onHeroChange(defaultHero || hero)
  }
  render() {
    const { heroIndex } = this.state
    const hero = Hero[heroIndex]
    return (
      <div>
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
