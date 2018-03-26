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

const renderDefaultStyle = i => ({
  transition: `all 600ms ease`,
  opacity: 0,
  transform: `translate(-80%, ${-100 * (i + 1)}%)`
})

const renderTransitionStyles = (i, state) => ({
  entering: { opacity: 0, transform: `translate3d(-30%, ${-100 * (i + 1)}%, 0)` },
  entered: { opacity: 1, transform: `translate3d(0, ${-100 * (i + 1)}%, 0)` },
  exiting: { opacity: 1, transform: `translate3d(0, ${-100 * (i + 1)}%, 0)` },
  exited: { opacity: 0, transform: `translate3d(-30%, ${-100 * (i + 1)}%, 0)` }

})

const PlayList = ({ playList, theme, listShow }) => {
  const renderTimeout = i => ({
    enter: 100 + (100 * i),
    exit: 100 + (100 * i),
  })
  return (
      playList.map((p, i) => {
        return (
          <Transition in={listShow} appear={false} timeout={renderTimeout(i)} key={i}>
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
                  className="playlist-content"
                  style={{
                    ...renderDefaultStyle(i),
                    ...renderTransitionStyles(i, state)[state],
                    // ...{ transform: `translate3d(${i * 10}%, -100%, 0)` },
                    // ...transitionStyles[state],
                    ...{ color: theme.musicPlayerColor, backgroundColor: theme.musicPlayerBg }
                  }}
                >
                  <h3 className="title">{p.title}</h3>
                  {/* <p className="artist">By {p.artist}</p> */}
                </div>
              </React.Fragment>
            )}
          </Transition>
        )
      })
  )
}

const CurrentPlaying = ({ theme, currMusic, onMouseEnterContent, onMouseLeaveContent }) => {
  // let clickContent = onMouseEnterContent && onMouseEnterContent.bind(this, currMusic)
  return (
    <Transition appear={true} in={true} timeout={duration}>
      <div
        className="currentplaying"
        style={{ color: theme.musicPlayerColor, backgroundColor: theme.musicPlayerBg}}
        onMouseEnter={onMouseEnterContent}
      >
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
      <div
        className="player-content"
        style={{left: `translateX(-100%)`}}
        onMouseLeave={this.onMouseLeaveContent.bind(this)}
      >
        <CurrentPlaying
          currMusic={currMusic}
          theme={theme}
          onMouseEnterContent={this.onMouseEnterContent.bind(this)}
        >
        </CurrentPlaying>
        <PlayList playList={playList} theme={theme} listShow={listShow}></PlayList>
      </div>
    )
  }
}
