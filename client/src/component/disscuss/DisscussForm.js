import React, { Component } from 'react'
import { Transition } from 'react-transition-group'
import Axios from 'axios'

import { defaultFormStyle, transitionFormStyles, transitionFormInnerStyles, defaultFormInnerStyle } from './TransitionConfig'

const ButtonGroup = ({ onClickCancel, onClickNext }) => (
    <div className="button-group">
    {
      <React.Fragment>
        <a onClick={onClickCancel}>我不想写了</a>
        <a onClick={onClickNext}>然后</a>
      </React.Fragment>
    }
    </div>
)

const SendingDisscuss = () => (
  <div className="disscuss-sending">发送中...</div>
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
      isContentFilled: false,
      formType: 0// 0：输入留言内容, 1: 载入中
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
  onClickNext () {
    const { textareaValue } = this.state
    if (textareaValue) {
      this.formTypeChange(1)
      // 加载用户名输入的form
    }
  }
  formTypeChange (type) {
    this.setState({ formType: -1 })
    setTimeout(() => {
      this.setState({ isContentFilled: true, formType: type })
      this.SendDisscuss()
    }, 600)
  }
  SendDisscuss () {
    const { textareaValue } = this.state
    const { user } = this.props
    Axios
      .post('/api/comment/addComment', {
        user,
        content: textareaValue
      })
      .then((res) => {
        this.props.onFormSent()
      })
      .catch((err) => {
        // this.$warning(err.msg)
      })
  }
  refreshForm () {
    this.setState({ formType: 0,  isContentFilled: false, textareaValue: '' })
  }
  render() {
    const { onClickCancel, formIn } = this.props
    const { textareaValue, isContentFilled, formType } = this.state
    console.log(formType)
    return (
      <Transition in={formIn} appear={true} timeout={300}>
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
                      <SendingDisscuss />
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
