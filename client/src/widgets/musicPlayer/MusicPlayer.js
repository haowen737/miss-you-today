import React, { Component } from 'react'

import './MusicPlayer.css'

import MyMusic from './MyMusic'

const ControlPlay = ({ currMusic }) => {
  return (
    <audio src='./audio/Broken Back - Happiest Man on Earth.mp3' autoplay="true"></audio>
  )
}

export default class MusicPlayer extends Component {
  constructor() {
    super()
    this.state = {
      currMusic: MyMusic[0]
    }
  }
  render() {
    const { currMusic } = this.state
    
    return (
      <div className="music-player clearfix">
        <div className="cover"></div>
        <ControlPlay currMusic={currMusic}></ControlPlay>
        <div className="control-play"></div>
        <div className="content">
          <h3 className="title">{currMusic.title}</h3>
          <p className="artist">By {currMusic.artist}</p>
        </div>
        <audio src='./audio/1.mp3' autoplay="true" preload="auto" controls></audio>
      </div>
    )
  }
}
