import React, { Component } from 'react'

export default class BlogCollect extends Component {
  componentDidMount () {
    this.tryIn = setInterval(() => {
      console.log(new Date().getSeconds())
    }, 1000)
  }
  render() {
    return (
      <div>
        thisis co
      </div>
    )
  }
}
