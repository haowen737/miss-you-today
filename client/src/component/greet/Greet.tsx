import * as React from 'react'
import { Dispatch } from 'redux';
import { connect as connectComponent } from 'react-redux'

import GreetContent from '../greetContent/GreetContent'
import GreetFlower from '../greetFlower/GreetFlower'
import GreetHeader from '../greetHeader/GreetHeader'
import SocialLinkList from './SocialLinkList'

import { themeChange, WithYouAction } from '../../actions'
import { ThemeEnum } from '../../Hero.service'
import { Theme, StoreState } from '../../types'

import './Greet.css'

const mapStateToProps = (state: StoreState) => ({
  theme: state.theme,
  apis: state.apis
})

const mapDispatchToProps = (dispatch: Dispatch<WithYouAction>) => ({
  themeChange: (theme: Theme) => dispatch(themeChange(theme))
})

interface Props {
  theme: Theme;
  themeChange: any
}

interface State {
  heroIndex: number
}

export const connect = (mapStateToPropsShadow: any, actionsShadow: any) => {
  return (target: any) => (
    connectComponent(mapStateToPropsShadow, actionsShadow)(target) as any
  )
}

// interface PlayerPropsClass {
//   player: PlayerStateTypes;
//   playerActions: actions.PlayerActionsTypes;
// }

@connect(mapStateToProps, mapDispatchToProps)
export default class Greet extends React.Component<Props, State> {
  private greetMan: any
  constructor (props: Props) {
    super(props)
    this.state = {
      heroIndex: 0
    }
  }

  public componentDidMount() {
    this.emitThemeChange()
    this.greetMan = setInterval(this.indexManager.bind(this), 5000)
  }

  public componentWillUnmount() {
    if (this.greetMan) { clearInterval(this.greetMan) }
  }

  public indexManager = () => {
    this.setState((prev) => {
      const currIndex = prev.heroIndex > 2 ? 0 : prev.heroIndex + 1
      this.emitThemeChange(currIndex)
      return {
        heroIndex: currIndex
      }
    })
  }

  public rd = (n: number, m: number) => {
    const c = m - n
    return Math.floor(Math.random() * c + n)
  }

  public emitThemeChange = (index: number = -1) => {
    const hero = ThemeEnum[index > -1 ? index : this.rd(0, 4)]
    this.props.themeChange(hero)
  }
  
  // private greetContent: any
  
  public render() {
    const { theme } = this.props
    return (
      <div className="greet-container" style={{backgroundColor: theme.theme}}>
        <GreetHeader theme={theme.headerTheme} />
        <div className="greet-flower-layout">
          <GreetFlower
            theme={theme}
            poem={theme.poem} />
        </div>
        <div className="greet-content-layout">
          <GreetContent
            theme={theme}
            // ref={(c) => { this.greetContent = c; }}
          />
          <SocialLinkList theme={theme} />
        </div>
      </div>
    )
  }
}
