import React, { Component } from 'react'
import Axios from 'axios'

export default class BlogTags extends Component {
  constructor () {
    super()
    this.state = {
      bookmarks: []
    }
  }
  getTags () {
    Axios
      .get('/api/article/getTags')
      .then(({ data }) => {
        this.setState({ bookmarks: [] })
        setTimeout(() => {
          this.setState({ bookmarks: data })
        }, 0)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    return (
      <div>
        this is marker
      </div>
    )
  }
}
