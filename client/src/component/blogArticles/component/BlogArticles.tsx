import * as React from 'react'
import { observer, inject } from "mobx-react"

import ArticleItem from './ArticleItem'
import { Swagger } from '@utils'

import { articleList } from '../style'

interface State {
  articles: any[]
}

@inject('$api')
@observer
export default class BlogArticles extends React.Component<any, State> {
  constructor (props: object) {
    super(props)
    this.state = {
      articles: [null, null, null, null]
    }
  }
  
  componentDidMount () {
  console.log('arts-----', this.props)

    this.getArticles()
  }
  
  getArticles () {
    Swagger.apis.article.getArticles()
      .then(({data}: any) => {
        this.setState({ articles: data })
      })
  }

  renderArticles () {
    const { articles } = this.state
    return articles.map((a, i) => <ArticleItem article={a} key={i} index={i} />)
  }

  render() {
    return (
      <div className={articleList}>
      {this.renderArticles()}
      </div>
    )
  }
}
