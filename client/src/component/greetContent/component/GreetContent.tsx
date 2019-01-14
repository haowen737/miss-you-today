import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { random } from 'lodash'
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

function usePrevious<T>(value: T): T {
  const ref: any = useRef(null)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const Steps = {
  WRITE: 'write',
  EREASE: 'erase'
}

function r() {
  return random(1.0, 2.0) * 70
}

function TypeWritter({ name }: TypeWritterProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [magicName, setMagicName] = useState('')
  const [step, setStep] = useState(Steps.WRITE)
  const prevName = usePrevious(name)

  let increaseInterval: number | undefined
  // let decreaseInterval: number | undefined
  useEffect(() => {
    if (step === Steps.WRITE) {
      increaseInterval = window.setInterval(handleIncreaseWordIndex, r())
    }
    return function clear() {
      window.clearInterval(increaseInterval)
    }
  }, [wordIndex, step])

  useEffect(() => {
    // setWordIndex(prevName ? prevName.length : 0)
    setWordIndex(0)
    // prevName && setStep(Steps.EREASE)
  }, [name])

  function handleIncreaseWordIndex(): void {
    if (name && wordIndex >= name.length) {
      window.clearInterval(increaseInterval)
      return
    }
    console.log('increase handler---', name)
    const index = wordIndex + 1
    setMagicName(name.slice(0, index))
    setWordIndex(index)
  }

  return (
    <span className="type-writter">{magicName}</span>
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
