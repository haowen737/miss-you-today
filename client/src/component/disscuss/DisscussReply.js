import React, { Component } from 'react'
import Axios from 'axios'

export default class DisscussReply extends Component {
  constructor () {
    super()
    this.state = {
      replyValue: ''
    }
  }
  handleReplyChange (ev) {
    this.setState({ replyValue: ev.target.value })
  }
  onReadySendReply () {
    const { replyValue } = this.state
    const { replyTo, user, item } = this.props
    console.log(replyTo, user, item)
    if (!replyValue) {
      window.alert('呸！没有输入提交什么表单')
      return
    }
    if (!user || !user.nick_name) {
      window.alert('need login')
      return
    }
    this.send({
      content: replyValue,
      parentId: replyTo ? replyTo.parent_id : item.id,
      replyToUser: replyTo ? replyTo.user_id : null,
      userId: user.id
    })
  }
  send (data) {
    Axios
    .post('/api/comment/reply', data)
    .then((res) => {
      this.props.onReplySent()
    })
    .catch((err) => {
      // this.$warning(err.msg)
    })
  }
  render() {
    const { replyValue } = this.state
    const { item, onClickCancel, list, itemIndex, replyTo } = this.props
    console.log(replyTo)
    return (
      <div className="replydialog-container">
        <input
        value={replyValue}
        onChange={this.handleReplyChange.bind(this)}
        placeholder={`${replyTo ? '@' + replyTo.nick_name : '添加公开回复'}`}
        autoFocus></input>
        <div className="replydialog-btn-group">
          <a className="replydialog-cancel" onClick={() => onClickCancel({ list, item, itemIndex })}>取消</a>
          <a className="replydialog-cancel" onClick={this.onReadySendReply.bind(this)}>提交</a>
        </div>
      </div>
    )
  }
}
