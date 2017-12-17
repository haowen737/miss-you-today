import React, { Component } from 'react'
import { Transition } from 'react-transition-group'
import Axios from 'axios'

import { defaultFormStyle, transitionFormStyles, transitionFormInnerStyles, defaultFormInnerStyle } from './TransitionConfig'

const ButtonGroup = ({ onClickConfirm, onClickCancel, onClickNext, onClickBack }) => (
    <div className="button-group">
    {
      onClickConfirm ? (
        <React.Fragment>
          <a onClick={onClickCancel}>我不想写了</a>
          <a onClick={onClickConfirm}>写好了</a>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <a onClick={onClickCancel}>我不想写了</a>
          <a onClick={onClickNext}>然后</a>
        </React.Fragment>
      )
    }
    </div>
)

const MailInput = ({ value, handleChange }) => (
  <input
  placeholder="在这里写你的邮箱📮"
  value={value}
  onChange={handleChange}
  autoFocus
  />
)
const NameInput = ({ value, handleChange }) => (
  <input
  placeholder="在这里写你的称呼🤗"
  value={value}
  onChange={handleChange}
  />
)

const ContentInput = ({ value, handleChange }) => (
  <textarea
  value={value}
  onChange={handleChange}
  placeholder="在这里写你要说的话😘"
  autoFocus
  />
)

export default class DisscussForm extends Component {
  constructor () {
    super()
    this.state = {
      textareaValue: '',
      mail: '',
      username: '',
      isContentFilled: false,
      formType: -1// 0：输入留言内容, 1: 输入留言人信息
    }
  }
  componentWillReceiveProps ({ formIn }) {
    document.body.style.overflow = formIn ? 'hidden' : 'auto'
  }
  componentWillUnmount () {
    document.body.style.overflow = 'auto'
  }
  handleTextareaChange (ev) {
    this.setState({ textareaValue: ev.target.value })
  }
  handleMailChange (ev) {
    this.setState({ mail: ev.target.value })
  }
  handleNameChange (ev) {
    this.setState({ username: ev.target.value })
  }
  onClickNext () {
    const { textareaValue } = this.state
    if (textareaValue) {
      this.formTypeChange(1)
      // 加载用户名输入的form
    }
  }
  onClickBack () {
    this.formTypeChange(0)
  }
  formTypeChange (type) {
    this.setState({ formType: -1 })
    setTimeout(() => {
      this.setState({ isContentFilled: true, formType: type })
    }, 600);
  }
  onClickConfirm () {
    const { textareaValue, username, mail } = this.state
    Axios
      .post('/api/comment/addComment', {
        userName: username,
        content: textareaValue,
        mail: mail
      })
      .then((res) => {
        this.props.onFormSent()
      })
      .catch((err) => {
        // this.$warning(err.msg)
      })
    console.log(textareaValue, username, mail)
  }
  render() {
    const { onClickCancel, formIn } = this.props
    const { textareaValue, isContentFilled, mail, username, formType } = this.state
    return (
      <Transition in={formIn} appear={true} timeout={300} onEntered={() => this.setState({formType: 0})}>
      {
        (state) => (
          <div className="disscuss-form-container"
          style={{
            ...defaultFormStyle,
            ...transitionFormStyles[state]
          }}>
            <div className="disscuss-form">
            {
              isContentFilled ? (
                <Transition in={formType === 1} appear={true} timeout={300}>
                {
                  (state) => (
                    <div
                    className="disscuss-form-inner"
                    style={{
                      ...defaultFormInnerStyle,
                      ...transitionFormInnerStyles[state]
                    }}>
                      <MailInput
                      handleChange={this.handleMailChange.bind(this)}
                      value={mail}
                      />
                      <NameInput
                      handleChange={this.handleNameChange.bind(this)}
                      value={username}
                      />
                      <ButtonGroup
                      onClickConfirm={this.onClickConfirm.bind(this)}
                      onClickCancel={onClickCancel}
                      />
                    </div>
                  )
                }
                </Transition>
              ) : (
                <Transition in={formType === 0} appear={true} timeout={300}>
                {
                  (state) => (
                    <div
                    className="disscuss-form-inner"
                    style={{
                      ...defaultFormInnerStyle,
                      ...transitionFormInnerStyles[state]
                    }}>
                      <ContentInput
                      handleChange={this.handleTextareaChange.bind(this)}
                      value={textareaValue} />
                      <ButtonGroup
                      onClickCancel={onClickCancel}
                      onClickNext={this.onClickNext.bind(this)}
                      />
                    </div>
                  )
                }
                </Transition>
              )
            }
            </div>
          </div>
        )
      }
    </Transition>
      
    )
  }
}
