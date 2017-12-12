import React, { Component } from 'react'
import { connect } from 'react-redux'

import './MusicPlayer.css'

import MyMusic from './MyMusic'
import DefaultPlayer from './DefaultPlayer'
import MiniPlayer from './MiniPlayer'

class MusicPlayer extends Component {
  constructor() {
    super()
    this.state = {
      currMusic: MyMusic[0],
      playStatus: false
    }
  }
  onPlayStatusChange () {
    this.setState(prev => ({
      playStatus: !prev.playStatus
    }))
    this.playPause.setDirection(this.state.playStatus ? -1 : 1)
    this.playPause.play()
  }
  renderMusicPlayerStyle (theme) {
    return {
      backgroundColor: theme.musicPlayerBg
    }
  }
  render() {
    const { theme } = this.props
    const { currMusic, playStatus } = this.state
    return (
      <div className="music-player-container">
      {
        theme.miniMusicPlayer
        ? <MiniPlayer theme={theme} MyMusic={MyMusic} currMusic={currMusic} playStatus={playStatus}></MiniPlayer>
        : <DefaultPlayer theme={theme} MyMusic={MyMusic} currMusic={currMusic} playStatus={playStatus}></DefaultPlayer>
      }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme
})

export default connect(
  mapStateToProps
)(MusicPlayer)
