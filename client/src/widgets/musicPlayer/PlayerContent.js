import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

const duration = 270;

// const renderDefaultStyle = (index) => ({
//   transition: `all ${index * 10}ms linear`,
//   opacity: 0,
//   transform: `translate(-80%,  -100%)`
// })

// const transitionStyles = {
//   entering: { opacity: 0, transform: `translate(-80%, -100%)` },
//   entered:  { opacity: 1, transform: `translate(0, -100%)` },
// }

const defaultStyle = {
  transition: `all 600ms ease`,
  opacity: 0,
  transform: 'translate(-80%, -100%)'
}

const transitionStyles = {
  entering: { opacity: 0, transform: `translate3d(30%, -100%, 0)` },
  entered: { opacity: 1, transform: `translate3d(0, -100%, 0)` }
}

const PlayList = ({ playList, theme, listShow }) => {
  console.log(listShow)
  return (
    <div className="play-list-container">
      {
        playList.map((p, i) => {
          return (
            <Transition in={listShow} appear={listShow} timeout={duration} key={i}>
              {(state) => (
                // <ListItem
                //   style={{
                //     ...defaultStyle,
                //     ...{ transform: `translate3d(${i * 10}%, 0, 0)` },
                //     ...transitionStyles[state]
                //   }}
                //   // style={{
                //   //   ...renderDefaultStyle(i),
                //   //   ...transitionStyles[state],
                //   // }}
                //   currMusic={p}
                //   theme={theme}>
                // </ListItem>
                <React.Fragment>
                  <div
                    className="content"
                    style={{
                      ...defaultStyle,
                      ...{ transform: `translate3d(${i * 10}%, -100%, 0)` },
                      ...transitionStyles[state],
                      ...{ color: theme.musicPlayerColor, backgroundColor: theme.musicPlayerBg }
                    }}
                  >
                    <h3 className="title">{p.title}</h3>
                    <p className="artist">By {p.artist}</p>
                  </div>
                </React.Fragment>
              )}
            </Transition>
          )
        })
      }
    </div>
  )
}

const ListItem = ({ theme, currMusic, onMouseEnterContent, onMouseLeaveContent }) => {
  // let clickContent = onMouseEnterContent && onMouseEnterContent.bind(this, currMusic)
  return (
    <Transition appear={true} in={true} timeout={duration}>
      <div
        className="content"
        style={{ color: theme.musicPlayerColor, backgroundColor: theme.musicPlayerBg}}
        onMouseEnter={onMouseEnterContent}
        onMouseLeave={onMouseLeaveContent}>
        <h3 className="title">{currMusic.title}</h3>
        <p className="artist">By {currMusic.artist}</p>
      </div>
    </Transition>
  )
}

export default class PlayerContent extends Component {
  constructor () {
    super()
    this.state = {
      listShow: false
    }
  }
  componentDidMount () {
  }
  onMouseEnterContent () {
    !this.state.listShow && this.setState({ listShow: true })
  }
  onMouseLeaveContent () {
    this.state.listShow && this.setState({ listShow: false })
  }
  render() {
    const { currMusic, theme, playList } = this.props
    const { listShow } = this.state
    return (
      <div className="player-content" style={{left: `translateX(-100%)`}}>
        <PlayList playList={playList} theme={theme} listShow={listShow}></PlayList>
        <ListItem
          currMusic={currMusic}
          theme={theme}
          onMouseEnterContent={this.onMouseEnterContent.bind(this)}
          onMouseLeaveContent={this.onMouseLeaveContent.bind(this)}>
        </ListItem>
      </div>
    )
  }
}
