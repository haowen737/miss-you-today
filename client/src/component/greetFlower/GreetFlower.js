import React, { Component } from 'react'
import { Transition, TransitionGroup } from 'react-transition-group';
import './GreetFlower.css'

const Fade = (props) => {
  const poem = props.poem || []
  const length = poem.length
  const listFrag = poem.map(
    (i, index) => {
      const duration = 300
      let opacity = 1 / (i + 1)
      const defaultStyle = {
        transition: `all 1000ms ease-in-out`,
        opacity: 0,
      }
      const transitionStyles = {
        entering: { opacity: 0 },
        entered: { opacity: 1 },
      }
      return (
        <Transition
        in={props.inProp}
        timeout={duration}
        appear={true}
        key={index}>
          {(state) => {
            <li style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}>{i}</li>
          }}
        </Transition>
      )
    }
  )
  return listFrag
}

export default class GreetFlower extends Component {
  constructor () {
    super()
    this.state = {
      show: false
    }
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        show: true
      })
    }, 0)
  }
  render() {
    const { show } = this.state
    return (
      <div className="greet-flower">
        <TransitionGroup className="fade-list">
          {this.props.poem.map((item, i) => (
            <Fade key={i}>
              <p>{`${item}`}</p>
            </Fade>
          ))}
        </TransitionGroup>
      </div>
    )
  }
}
