import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { random } from 'lodash'
import { ThemeState } from '@types'
import {RouteComponentProps} from "react-router"

import useTypeWritter from 'react-typewriter-hook'
import ParticleEffectButton from 'react-particle-effect-button'

import style from '../style'

export interface Props {
  theme: ThemeState
}

interface State {
  startButtonHidden: boolean
}

interface TypeWritterProps {
  name: string
}

function TypeWritterWrapper({ name }: TypeWritterProps) {
  const word = useTypeWritter(name)

  return (
    <span className="type-writter">{word}</span>
  )
}

export default class GreetContent extends React.Component<Props & RouteComponentProps<any>, State> {
  // private ereaseSelf: any
  // private penSelf: any

  constructor (props: Props & RouteComponentProps<any>) {
    super(props)
    this.state = {
      startButtonHidden: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        startButtonHidden: false
      })
    }, 100)
  }

  onClickStart() {
    const { history } = this.props
    this.setState({
      startButtonHidden: true
    }, () => {
      setTimeout(() => {
        history.push('/blog')
      }, 700)
    })
  }

  renderTypeWritter(): JSX.Element {
    const { color, name } = this.props.theme
    return (
      <p className="type-writter-wrapper">
        Make it&nbsp;
        <br className="hero-title-br"/>
        <TypeWritterWrapper name={name || ''} />
      </p>
    )
  }

  renderStartButton(): JSX.Element | void {
    const { startButtonHidden } = this.state
    const { color, btnTheme } = this.props.theme
    return (
      <ParticleEffectButton
        color='#121019'
        duration={700}
        hidden={startButtonHidden}
      >
        <a
          // to="/blog"
          onClick={() => { this.onClickStart() }}
          className="buttonStyle"
          style={{ color, backgroundColor: btnTheme }}>
            START A TRIP
        </a>
      </ParticleEffectButton>
      
    )
  }

  render() {
    return (
      <div className={style}>
        {this.renderTypeWritter()}
        <p className="heroSummary">Code · Design · Create · Capture · Inspire</p>
        {this.renderStartButton()}
      </div>
    )
  }
}
