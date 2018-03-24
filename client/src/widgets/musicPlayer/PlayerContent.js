import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

const duration = 270;

const renderDefaultStyle = (index) => ({
  transition: `all ${index * 10}ms linear`,
  opacity: 0,
  transform: `translate(-80%,  -100%)`
})

const transitionStyles = {
  entering: { opacity: 0, transform: `translate(-80%, -100%)` },
  entered:  { opacity: 1, transform: `translate(0, -100%)` },
}

const PlayList = ({ playList, theme, listShow }) => {
  return (
    <div className="play-list-container">
      {
        playList.map((p, i) => {
          return (
            <Transition in={listShow} timeout={duration}>
              {(state) => (
                <ListItem
                  style={{
                    ...renderDefaultStyle(i),
                    ...transitionStyles[state],
                    ...{ backgroundColor: theme.musicPlayerBg }
                  }}
                  key={i}
                  currMusic={p}
                  theme={theme}>
                </ListItem>
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
        style={{color: theme.musicPlayerColor}}
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
        <ListItem
          currMusic={currMusic}
          theme={theme}
          onMouseEnterContent={this.onMouseEnterContent.bind(this)}
          onMouseLeaveContent={this.onMouseLeaveContent.bind(this)}>
        </ListItem>
        <PlayList playList={playList} theme={theme} listShow={listShow}></PlayList>
      </div>
    )
  }
}
