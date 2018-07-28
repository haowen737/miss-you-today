import * as React from 'react'
import { Link } from 'react-router-dom'

import { Theme } from '@types'

import './GreetContent.css'

interface Props {
  theme: Theme
}
interface State {
  currName: string
  writingActive: boolean
  penIsWriting: boolean
}

export default class GreetContent extends React.Component<Props, State> {
  private ereaseSelf: any
  private penSelf: any

  constructor (props: Props) {
    super(props)
    this.state = {
      currName: '',
      writingActive: true,
      penIsWriting: false// 重写名字中，勿扰
    }
  }
  componentWillUnmount () {
    this.endWriteName()
  }

  pen (nextName: string) {
    let index = 1
    const spacing = Math.random() * 120 + 50
    if (!nextName) { return }
    this.penSelf = setInterval(() => {
      this.executePen(index, nextName)
      index++
    }, spacing)
  }

  executePen (index: number, nextName: string) {
    this.setState(prev => ({
      penIsWriting: true,
      currName: nextName.slice(0, index)
    }), () => {
      if (index === nextName.length) { 
        this.setState({ penIsWriting: false })
        clearInterval(this.penSelf)
      }
    })
  }

  erease () {
    const { currName } = this.state
    return new Promise((resolve) => {
      if (currName) {
        this.executeErease(resolve, currName)
      } else { resolve() }
    })
  }

  executeErease (resolve: any, currName: string) {
    const spacing = Math.random() * 120 + 50
    let index = currName.length
    this.ereaseSelf = setInterval(() => {
      --index
      this.setState(prev => ({
        penIsWriting: true,
        currName: prev.currName.slice(0, index)
      }), () => {
        if (index === 0) {
          resolve()
          this.setState({ penIsWriting: true })
          clearInterval(this.ereaseSelf)
        }
      })
    }, spacing)
  }

  startRewriteName (nextName: string) {
    this.erease().then(() => { this.pen(nextName) })
  }

  endWriteName () {
    this.setState({ writingActive: false }, () => {
      clearInterval(this.penSelf)
      clearInterval(this.ereaseSelf)
    })
  }

  shouldReWriteName (theme: Theme, currName: string) {
    const { writingActive, penIsWriting } = this.state
    if (!writingActive) { return }
    if (currName !== theme.name && !penIsWriting) {
      this.startRewriteName(theme.name)
    }
  }

  renderTypeWritter(): JSX.Element | void {
    const { color } = this.props.theme
    const { currName } = this.state
    return <span className="typeWritter" style={{ color }}>{currName}</span>
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

    const { currName } = this.state
    const { theme } = this.props

    this.shouldReWriteName(theme, currName)

    return (
      <div className="contentWrap">
        <p className="herotitle">
          Make it&nbsp;
          <br className="hero-title-br"/>
          {this.renderTypeWritter()}
        </p>
        <p className="heroSummary">Code · Design · Create · Capture · Inspire</p>
        {this.renderStartButton()}
      </div>
    )
  }
}
