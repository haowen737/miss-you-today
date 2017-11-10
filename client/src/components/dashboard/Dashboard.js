import React, { Component } from 'react'

const DateViewer = () => (
  <div className="date-viewer">
    <Date></Date>
  </div>
)

const Date = () => (
  <div className="date"></div>
)

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>今天</h1>
        <DateViewer></DateViewer>
      </div>
    )
  }
}
