import * as React from 'react'
import Axios from 'axios'
import * as ReactMarkdown from 'react-markdown'
import LoadingBall from '../../widgets/loadingBall/LoadingBall'

// import BlogTPComment from '../blogTPComment'
// import BlogArticleFooter from './BlogArticleFooter'

import './github-markdown.css'
import './BlogArticle.css'

interface Props {
  location?: any
}

interface State {
  data: any
}

export default class BlogArticle extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentWillMount () {
    this.getArticle()
  }

  getArticle () {
    const id = this.props.location.search.replace('?id=', '')
    if (id) { this.query(id) }
  }

  query (id: number) {
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
            </div>
          ) : (
            <div className="loading-wrap">
              <LoadingBall color="#666" />>
            </div>
          )
        }
        {/* <BlogTPComment articleId={data.file_id} /> */}
      </React.Fragment>
    )
  }
}
