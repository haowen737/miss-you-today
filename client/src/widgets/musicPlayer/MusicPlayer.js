import React, { Component } from 'react'
import { connect } from 'react-redux'

import './MusicPlayer.css'

import MyMusic from './MyMusic'
import DefaultPlayer from './DefaultPlayer'

class MusicPlayer extends Component {
  constructor() {
    super()
    this.state = {
      currMusic: MyMusic[0],
      playStatus: false
    }
  }
  renderPlayerLeft (theme) {
    const type = theme.musicPlayerType
    return type === 'hide' ? `-90%` : '-20px'
  }
  render() {
    const { theme } = this.props
    const { currMusic, playStatus } = this.state
    return (
      <div className="music-player-container">
        <DefaultPlayer
        left={this.renderPlayerLeft(theme)}
        theme={theme}
        MyMusic={MyMusic}
        currMusic={currMusic}
        playStatus={playStatus} />
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
