import React, { Component } from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'

import { defaultFormStyle, transitionFormStyles } from './TransitionConfig'

const CancelButton = ({ onClick }) => (
  <a onClick={onClick}>取消</a>
)

const NextButton = ({ onClick }) => (
  <a onClick={onClick}>下一步</a>
)

const ConfirmButton = ({ onClick }) => (
  <a onClick={onClick}>写好了</a>
)
 
const ButtonGroup = ({ onClickConfirm, onClickCancel, onClickNext }) => (
  <div className="button-group">
  {
    onClickConfirm ? (
      <ConfirmButton onClick={onClickConfirm}></ConfirmButton>
    ) : (
      <div>
        <CancelButton onClick={onClickCancel}></CancelButton>
        <NextButton onClick={onClickNext}></NextButton>
      </div>
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
  placeholder="在这里写留言😘"
  autoFocus />
)

export default class DisscussForm extends Component {
  constructor () {
    super()
    this.state = {
      textareaValue: '',
      mail: '',
      username: '',
      isContentFilled: false
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
      this.setState({ isContentFilled: true })
      // 加载用户名输入的form
    }
  }
  onClickConfirm () {
    const { textareaValue, username, mail } = this.state
    console.log(textareaValue, username, mail)
  }
  render() {
    const { onClickCancel, formIn } = this.props
    const { textareaValue, isContentFilled, mail, username } = this.state
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
                  <div>
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
                    />
                  </div>
                ) : (
                  <div>
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
            </div>
          </div>
        )
      }
    </Transition>
      
    )
  }
}
