import React, { Component } from 'react'
import Axios from 'axios'

export default class BlogArticle extends Component {
  componentWillMount (props) {
    console.log(this.props.location)
    this.getArticle()
  }
  getArticle () {
    const id = this.props.location.search.replace('?id=', '')
    id && this.query(id)
  }
  query (id) {
    console.log(id)
    Axios
      .get(`/api/article/getArticle/${id}`)
      .then(({ data }) => {
        this.setState({ articles: data })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    return (
      <div>
        123
      </div>
    )
  }
}
