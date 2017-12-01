import React, { Component } from 'react'
import { Transition, TransitionGroup } from 'react-transition-group';
import SpinningSpread from './../../widgets/spinningSpread/SpinningSpread';
import MusicPlayer from './../../widgets/musicPlayer/MusicPlayer';

import './GreetFlower.css'

const Poems = (props) => {
  const { show, theme } = props
  const doc = props.poem.map((item, i) => (
    <Transition
    in={show}
    timeout={0}
    appear={true}
    key={i}>
      {(state) => (
        <p style={{
          color: theme,
          ...renderDefaultStyle(i),
          ...renderTransitionStyles(i)[state]
        }}>
          {`${item}`}
        </p>
      )}
    </Transition>
  ))
  return doc
}

const renderDefaultStyle = (i) => {
  ++i
  return {
    transition: `all ${(i - i * 0.6) > 1.2 ? (i - i * 0.7) : (i - i * 0.6)}s ease`,
    opacity: 0,
    transform: `translateX('0')`,
  }
}

const renderTransitionStyles = (i) => {
  ++i
  const entering = { opacity: 0, transform: `translateX(-10%)` }
  const entered = { opacity: 1 - 0.2 * i, transform: `translateX(0)` }
  const exiting = { opacity: 1 - 0.2 * i, transform: `translateX(0%)` }
  const exited = { opacity: 0, transform: `translateX(10%)` }
  return {
    entering,
    entered,
    exiting,
    exited
  }
}

export default class GreetFlower extends Component {
  constructor () {
    super()
    this.state = {
      show: false,
      poem: []
    }
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        show: true,
        poem: this.props.poem
      })
    }, 0)
  }
  componentWillReceiveProps() {
    this.setState({ show: false })
    setTimeout(() => {
      this.setState({
        show: true,
        poem: this.props.poem
      })
    }, 1000)
  }

  render() {
    const { show, poem } = this.state
    const { theme } = this.props
    return (
      <div className="greet-flower">
        {/* <SpinningSpread></SpinningSpread> */}
        <MusicPlayer theme={theme}></MusicPlayer>
        <TransitionGroup className="fade-list">
          <Poems poem={poem} show={show} theme={theme}></Poems>
        </TransitionGroup>
      </div>
    )
  }
}
