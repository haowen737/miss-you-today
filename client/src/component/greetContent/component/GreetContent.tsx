import * as React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { css, keyframes } from 'react-emotion'

import { ThemeState } from '@types'
import styled from '@emotion/styled'

import style from '../style'

interface Props {
  theme: ThemeState
}
interface State {
  currName: string
  writingActive: boolean
  penIsWriting: boolean
}

interface TypeWritterProps {
  name: string
}

function TypeWritter({ name }: TypeWritterProps) {
  const [wordIndex, setWordIndex] = useState(1)
  const [prevName, setPrevName] = useState<string | null>(null)

  let counterInterval: number | null = null
  console.log('---bprevName !== name', prevName, name, prevName === name)
  if (prevName !== name) {
    setPrevName(name)
    setWordIndex(1)
    counterInterval && window.clearInterval(counterInterval)
    counterInterval = window.setInterval(handleCountWordIndex, 300)
  }

  function handleCountWordIndex(): void {
    // console.log('wordIndex,---', wordIndex, name)
    if (wordIndex > name.length) {
      counterInterval && window.clearInterval(counterInterval)
      return
    }
    console.log('incress', name.slice(0, wordIndex), wordIndex)
    setWordIndex(wordIndex + 1)
  }
  useEffect(() => {
    console.log('name---', name.slice(0, wordIndex), wordIndex)
  })

  return (
    <span>{name.slice(0, wordIndex)}</span>
  )
}

export default class GreetContent extends React.Component<Props, State> {
  // private ereaseSelf: any
  // private penSelf: any

  constructor (props: Props) {
    super(props)
    this.state = {
      currName: '',
      writingActive: true,
      penIsWriting: false// 重写名字中，勿扰
    }
  }

  renderTypeWritter(): JSX.Element {
    const { color, name } = this.props.theme
    console.log('name', name)
    // console.log('currName---', currName, this.props.theme)
    return (
      <p className="type-writter-wrapper">
        Make it&nbsp;
        <br className="hero-title-br"/>
        <TypeWritter name={name || ''} />
        <h4 className="caret" />
      </p>
    )
  }

  renderStartButton(): JSX.Element | void {
    const { color, btnTheme } = this.props.theme
    return (
      <Link
        to="/blog"
        className="buttonStyle"
        style={{ color, backgroundColor: btnTheme }}>
          START A TRIP
      </Link>
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
