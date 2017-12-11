import React, { Component } from 'react'

import './MusicPlayer.css'

import MyMusic from './MyMusic'

import PlayerContent from './PlayerContent'

import bodymovin from 'bodymovin'

import playPauseData from './../../resource/lottie/PlayPause.json'

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

const PlayPauseButton = ({type, control}) => {
  return (
    <div className="" onClick={control} id="bm"></div>
  )
}

export default class MusicPlayer extends Component {
  constructor() {
    super()
    this.state = {
      currMusic: MyMusic[0],
      playStatus: false
    }
  }
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
  render() {
    const { theme } = this.props
    const { currMusic, playStatus } = this.state
    console.log(theme, window.hero)
    return (
      <div className="music-player clearfix" style={{backgroundColor: theme.musicPlayerBg}}>
        <div className="cover"
          style={{backgroundImage: `url(${currMusic.cover})`}}
        ></div>
        <PlayerControl
          currMusic={currMusic}
          playStatus={playStatus}
          onPlayStatusChange={this.onPlayStatusChange.bind(this)}>
        </PlayerControl>
        <PlayerContent
          currMusic={currMusic}
          theme={theme}
          playList={MyMusic}>
        </PlayerContent>
      </div>
    )
  }
}
