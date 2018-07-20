import React, { Component } from 'react'
import Axios from 'axios'
import ReactMarkdown from 'react-markdown'
import LoadingBall from '../../widgets/loadingBall/LoadingBall'

import BlogTPComment from '../blogTPComment'
import BlogArticleFooter from './BlogArticleFooter'

import './github-markdown.css'
import './BlogArticle.css'

export default class BlogArticle extends Component {
  constructor () {
    super()
    this.state = {
      data: {}
    }
  }
  componentWillMount (props) {
    this.getArticle()
  }
  getArticle () {
    const id = this.props.location.search.replace('?id=', '')
    id ? this.query(id) : void 0
  }
  query (id) {
    Axios
      .get(`/api/article/getArticle/${id}`)
      .then(({ data }) => {
        setTimeout(() => {
          this.setState({ data })
        }, 0)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    const { data } = this.state
    return (
      <React.Fragment>
        {
          data.content ? (
            <div className="article-wrap">
              <ReactMarkdown className="markdown-body" source={data.content} />
                <BlogArticleFooter
                  data={data}
                />
            </div>
          ) : (
            <div className="loading-wrap">
              <LoadingBall color="#666"></LoadingBall>
            </div>
          )
        }
        <BlogTPComment articleId={data.file_id} />
      </React.Fragment>
    )
  }
}
