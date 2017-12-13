import React, { Component } from 'react'
import bodymovin from 'bodymovin'
import PlayerContent from './PlayerContent'

import playPauseData from './../../resource/lottie/PlayPause.json'

const PlayPauseButton = ({type, control}) => {
  return (
    <div className="" onClick={control} id="bm"></div>
  )
}

const PlayerControl = ({ currMusic, onPlayStatusChange, playStatus }) => {
  let player = null
  const control = (type) => {
    console.log(player)
    player.paused ? player.play() : player.pause()
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

export default class DefaultPlayer extends Component {
  constructor () {
    super()
    this.state = {
      musicPlayerHide: false,
      musicStyle: {},
      playStatus: false
    }
  }
  componentDidMount () {
    let target = document.getElementById('bm')
    if (!target) { return }
    setTimeout(() => {
      this.playPause = bodymovin.loadAnimation({
        container: target,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: playPauseData
      })
      this.playPause.playSegments([170, 193], true)
      this.playPause.setDirection(-1)
    }, 200)
  }
  componentWillReceiveProps ({ theme }) {
    this.renderMusicPlayerStyle(theme)
  }
  onPlayStatusChange () {
    this.setState(prev => ({
      playStatus: !prev.playStatus
    }))
    this.playPause.setDirection(this.state.playStatus ? -1 : 1)
    this.playPause.play()
  }
  onClickCover (theme) {
    console.log(theme)
    this.renderMusicPlayerStyle(theme)
  }
  renderMusicPlayerStyle (theme) {
    theme = theme || this.props.theme
    this.musicPlayerHide = this.musicPlayerHide ? !this.musicPlayerHide : theme.musicPlayerHide
    this.setState({
      musicStyle: {
        transform: `translate3d(${this.musicPlayerHide ? '-90%' : '0%'}, 0, 0)`
      }
    })
  }
  render() {
    const { theme, MyMusic, currMusic, left} = this.props
    const { musicStyle, playStatus } = this.state
    return (
      <div className="music-player clearfix" style={{backgroundColor: theme.musicPlayerBg,  ...musicStyle}}>
        <PlayerContent
          currMusic={currMusic}
          theme={theme}
          playList={MyMusic}>
        </PlayerContent>
        <PlayerControl
          currMusic={currMusic}
          theme={theme}
          playStatus={playStatus}
          onPlayStatusChange={this.onPlayStatusChange.bind(this)}>
        </PlayerControl>
        <div
          className="cover"
          style={{backgroundImage: `url(${currMusic.cover})`}}
          onClick={this.onClickCover.bind(this, theme)}
        ></div>
        {/* <PlayerFold></PlayerFold> */}
      </div>
    )
  }
}