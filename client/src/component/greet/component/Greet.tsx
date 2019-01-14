import * as React from 'react'
// import styled from 'react-emotion'

import GreetContent from '../../greetContent'
// import GreetFlower from '../greetFlower/GreetFlower'
import GreetHeader from '../../greetHeader/GreetHeader'
import SocialLinkList from './SocialLinkList'
import GreetCanvas from './GreetCanvas'

import { ThemeEnum } from '../../../Hero.service'
import { ThemeState } from '@types'

import { greetStyle } from '../style'

interface Props {
  theme: ThemeState;
  themeChange: any
}

interface State {
  heroIndex: number
}

export default class Greet extends React.Component<Props, State> {
  private greetMan: any
  constructor (props: Props) {
    super(props)
    this.state = {
      heroIndex: 0
    }
  }

  componentDidMount() {
    this.emitThemeChange()
    this.initIntervalIndexManager()
    document.addEventListener('visibilitychange', this.handleBrowserTabChange)
  }

  componentWillUnmount() {
    this.removeIntervalIndexManager()
    document.removeEventListener('visibilitychange', this.handleBrowserTabChange)
  }

  handleBrowserTabChange = () => {
    if (this.greetMan) {
      this.removeIntervalIndexManager()
    } else {
      this.initIntervalIndexManager()
    }
  }

  initIntervalIndexManager = () => {
    this.greetMan = setInterval(this.indexManager.bind(this), 7000)
  }
  removeIntervalIndexManager = () => {
    if (this.greetMan) {
      clearInterval(this.greetMan)
      this.greetMan = null
    }
  }
  indexManager = () => {
    this.setState((prev) => {
      const currIndex = prev.heroIndex > 2 ? 0 : prev.heroIndex + 1
      return {
        heroIndex: currIndex
      }
    }, () => {
      this.emitThemeChange(this.state.heroIndex)
    })
  }

  rd = (n: number, m: number) => {
    const c = m - n
    return Math.floor(Math.random() * c + n)
  }

  emitThemeChange = (index: number = -1) => {
    const hero = ThemeEnum[index > -1 ? index : this.rd(0, 4)]
    this.props.themeChange(hero)
  }
  
  render() {
    const { theme } = this.props

    return (
      <div className={greetStyle} style={{backgroundColor: theme.theme}}>
        <GreetHeader theme={theme} />
        {/* <div className="greet-flower-layout">
          <GreetFlower
            theme={theme}
            poem={theme.poem} />
        </div> */}
        <div className="greet-content-layout">
          <GreetContent
            theme={theme}
          />
          <SocialLinkList theme={theme} />
        </div>
        <GreetCanvas />
      </div>
    )
  }
}

