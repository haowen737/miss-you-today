import * as React from 'react'
import * as ReactMarkdown from 'react-markdown'
import LoadingBall from '../../../widgets/loadingBall/LoadingBall'

import { Swagger } from '@utils'
// import BlogTPComment from '../blogTPComment'
// import BlogArticleFooter from './BlogArticleFooter'
import { articleWrap, loadingWrap } from '../style' 

import '../BlogArticle.css'
import '../github-markdown.css'

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
    if (id) {
      Swagger.apis.article.getArticle({ id })
        .then(({ data }: any) => {
          this.setState({ data })
        })
    }
  }

  renderArticle = () => {
    const { data } = this.state

    return (
      <div className={articleWrap}>
        <ReactMarkdown className="markdown-body" source={data.content} />
      </div>
    )
  }

  renderLoading = () => {
    return (
      <div className={loadingWrap}>
        <LoadingBall color="#666" />>
      </div>
    )
  }
  
  render() {
    const { data } = this.state

    return (
      <React.Fragment>
        {
          data.content
            ? this.renderArticle()
            : this.renderLoading()
        }
        {/* <BlogTPComment articleId={data.file_id} /> */}
      </React.Fragment>
    )
  }
}
