import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

const duration = 300;

const defaultStyle = {
  transition: `all ${duration}ms linear`,
  opacity: 0,
  transform: `tranlateY(-80%)`
}

const transitionStyles = {
  entering: { opacity: 0, transform: `tranlateY(-80%)` },
  entered:  { opacity: 1, transform: `translateY(-100%)` },
}

const PlayList = ({ playList, theme, listShow }) => {
  return (
    <Transition in={listShow} timeout={duration}>
      {(state) => (
        <div
        className="play-list-container"
        style={{
          ...defaultStyle,
          ...transitionStyles[state],
          ...{backgroundColor: theme.musicPlayerBg}
        }}>
          {
            playList.map((p, i) => {
              return (
                <ListItem
                  key={i}
                  currMusic={p}
                  theme={theme}>
                </ListItem>
              )
            })
          }
        </div>
      )}
    </Transition>
  )
}

const ListItem = ({ theme, currMusic, onClickContent }) => {
  let clickContent = onClickContent && onClickContent.bind(this, currMusic)
  return (
    <Transition appear={true} in={true} timeout={duration}>
      <div
      className="content"
      style={{color: theme.musicPlayerColor}}
      onClick={clickContent}>
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
  onClickContent () {
    this.setState((prev) => (
      { listShow: !prev.listShow }
    ))
  }
  render() {
    const { currMusic, theme, playList } = this.props
    const { listShow } = this.state
    return (
      <div className="player-content" style={{left: `translateX(-100%)`}}>
        <ListItem
          currMusic={currMusic}
          theme={theme}
          onClickContent={this.onClickContent.bind(this)}>
        </ListItem>
        <PlayList playList={playList} theme={theme} listShow={listShow}></PlayList>
      </div>
    )
  }
}
