import React, { Component } from 'react'
import Axios from 'axios'
import { Transition } from 'react-transition-group'

import { defaultStyle, transitionStyles } from './TransitionConfig'
import DisscussReply from './DisscussReply'

import LoadingCircle from './../../widgets/loadingCircle'

const DisscussItem = ({ list, item, itemIndex, onClickReply }) => {
  return (
    <Transition in={true} appear={true} timeout={(50 + (50 * itemIndex))}>
      {(state) => (
        <li
        className="disscuss-item"
        style={{
          ...defaultStyle,
          ...transitionStyles[state],
          ...{transformDuration: `${itemIndex * 10 + 100}ms`}
        }}>
          <p className="disscuss-name">@{item.nick_name}</p>
          <h2 className="disscuss-content">{item.content}</h2>
          <a className="discuss-reply" onClick={() => onClickReply({ list, item, itemIndex })}>回复</a>
        </li>
      )}
    </Transition>
  )
}

const DisscussItemChild = ({ list, children, onClickReply, itemIndex }) => (
  <ul className="disscuss-children">
    {
      children.map((child, index) => (
        <Transition key={index} in={true} appear={true} timeout={(400 + (50 * index))}>
        {(state) => (
          <li
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
            ...{transformDuration: `${index * 10 + 100}ms`}
          }}>
            <DisscussItemChildUsers child={child}></DisscussItemChildUsers>
            <a className="discuss-reply" onClick={() => onClickReply({ list, child, itemIndex })}>回复</a>
          </li>
        )}
        </Transition>
      ))
    }
  </ul>
)

const DisscussItemChildUsers = ({ child }) => {
  return (
    <React.Fragment>
      <span className="disscuss-children-name">{child.nick_name}</span>
      {
        (child.nick_name !== child.reply_to_name && child.reply_to)
        && (
          <React.Fragment>
            <span className="disscuss-children-reply">&nbsp;回复了&nbsp;</span>
            <span className="disscuss-children-name">{child.reply_to_name}</span>
          </React.Fragment>
        )
      }
      <span className="disscuss-children-content">{child.content}</span>
    </React.Fragment>
  )
}

const ListEmpty = () => (
  <div className="list-empty-container">
    <LoadingCircle></LoadingCircle>
  </div>
)

export default class DisscussList extends Component {
  constructor () {
    super()
    this.state = {
      list: []
    }
  }
  componentDidMount () {
    this.getDisscuss()
  }
  getDisscuss () {
    Axios
      .get('/api/comment/getComments')
      .then(({ data }) => {
        this.setState({ list: data.reverse(), formIn: false })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  onClickShowReply ({ list, item, itemIndex, child }) {
    console.log('child--->', child, this.props)
    const { user, history } = this.props
    !user.id && history.push('/signin')
    list[itemIndex].showReply = true
    this.setState({ disscussList: list, item: item, replyTo: child })
  }
  onClickReplyCancel ({ list, item, itemIndex }) {
    list[itemIndex].showReply = false
    this.setState({ disscussList: list })
  }
  onReplySent () {
    this.getDisscuss()
  }
  render() {
    const { list, itemIn, formIn, replyValue, replyTo } = this.state
    const { user } = this.props
    return (
      <ul className="discuss-list">
      {
        list.length
          ? list.map((item, i, list) => (
            <React.Fragment key={i}>
              <DisscussItem
              list={list}
              item={item}
              itemIn={itemIn}
              onClickReply={this.onClickShowReply.bind(this)}
              itemIndex={i} />
              {
                item.children.length
                ? <DisscussItemChild
                  list={list}
                  children={item.children}
                  itemIndex={i}
                  onClickReply={this.onClickShowReply.bind(this)} />
                : null
              }
              {
                item.showReply
                && <DisscussReply
                user={user}
                list={list}
                item={item}
                itemIndex={i}
                replyTo={replyTo}
                onClickCancel={this.onClickReplyCancel.bind(this)}
                onReplySent={this.onReplySent.bind(this)}
                item={item} />
              }
            </React.Fragment>
          ))
        : <ListEmpty></ListEmpty>
      }
      </ul>
    )
  }
}
