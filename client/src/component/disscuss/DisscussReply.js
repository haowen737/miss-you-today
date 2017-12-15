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
  onReadySendReply (item) {
    const { replyValue } = this.state
    if (!replyValue) {
      alert('呸！没有输入提交什么表单')
    }
    this.send(replyValue, item)
    // this.props.onReadySendReply(replyValue)
  }
  send (val, item) {
    Axios
    .post('/api/comment/reply', {
      userName: 'test',
      content: val,
      parentName: item.user_name,
      parent_id: item.id
    })
    .then((res) => {
      this.props.onReplySent()
    })
    .catch((err) => {
      // this.$warning(err.msg)
    })
    console.log(val, item)
  }
  render() {
    const { replyValue } = this.state
    const { item, onClickCancel, onClickSend } = this.props
    return (
      <div className="replydialog-container">
        <input
        value={replyValue}
        onChange={this.handleReplyChange.bind(this)}
        placeholder="添加公开回复"
        autoFocus></input>
        <div className="replydialog-btn-group">
          <a className="replydialog-cancel" onClick={onClickCancel}>取消</a>
          <a className="replydialog-cancel" onClick={this.onReadySendReply.bind(this, item)}>提交</a>
        </div>
      </div>
    )
  }
}
