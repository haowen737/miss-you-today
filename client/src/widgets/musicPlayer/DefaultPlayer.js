import React, { Component } from 'react'
import bodymovin from 'bodymovin'
import PlayerContent from './PlayerContent'

import playPauseData from './../../resource/lottie/PlayPause.json'

const PlayerFold = () => (
  <div className="player-fold"></div>
)

const PlayPauseButton = ({type, control}) => {
  return (
    <div className="" onClick={control} id="bm"></div>
  )
}

const PlayerControl = ({ currMusic, onPlayStatusChange, playStatus }) => {
  let player = null
  const control = (type) => {
    player.paused ? player.pause() : player.pause()
    onPlayStatusChange()
  }
  // status控制播放器 播放 暂停
  return (
    <div className="control-player-container">
      <div className="control-play">
        {
          <PlayPauseButton type={playStatus} control={control}></PlayPauseButton>
        }
      </div>
      <audio src={currMusic.src} autoPlay="false" ref={(el) => { player = el }}></audio>
    </div>
  )
}

export default class componentName extends Component {
  componentDidMount () {
    setTimeout(() => {
      this.playPause = bodymovin.loadAnimation({
        container: document.getElementById('bm'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: playPauseData
      })
      this.playPause.playSegments([170, 193], true)
      this.playPause.setDirection(-1)
    }, 200)
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
    const { theme, MyMusic, currMusic, playStatus} = this.props
    return (
      <div className="music-player clearfix" style={this.renderMusicPlayerStyle(theme)}>
        <div className="cover"
          style={{backgroundImage: `url(${currMusic.cover})`}}
        ></div>
        <PlayerControl
          currMusic={currMusic}
          theme={theme}
          playStatus={playStatus}
          onPlayStatusChange={this.onPlayStatusChange.bind(this)}>
        </PlayerControl>
        <PlayerContent
          currMusic={currMusic}
          theme={theme}
          playList={MyMusic}>
        </PlayerContent>
        {/* <PlayerFold></PlayerFold> */}
      </div>
    )
  }
}
