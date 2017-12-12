import React, { Component } from 'react'
import Axios from 'axios'
import ReactMarkdown from 'react-markdown'
import LoadingBall from './../../widgets/loadingBall/LoadingBall'

import './github-markdown.css'
import './BlogArticle.css'

export default class BlogArticle extends Component {
  constructor () {
    super()
    this.state = {
      article: ''
    }
  }
  componentWillMount (props) {
    console.log(this.props.location)
    this.getArticle()
  }
  getArticle () {
    const id = this.props.location.search.replace('?id=', '')
    id && this.query(id)
  }
  query (id) {
    Axios
      .get(`/api/article/getArticle/${id}`)
      .then(({ data }) => {
        setTimeout(() => {
          this.setState({ article: data.content })
        }, 0)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    const { article } = this.state
    return (
      <div className="article-wrap">
      {
        article ? (
          <ReactMarkdown className="markdown-body" source={article} />
        ) : (
          <LoadingBall color="#666"></LoadingBall>
        )
      }
      </div>
    )
  }
}
