import React, { Component } from 'react'

const CancelButton = () => (
  <button>取消</button>
)

const ConfirmButton = () => (
  <button>下一步</button>
)
 
const ButtonGroup = () => (
  <div>
    <CancelButton></CancelButton>
    <ConfirmButton></ConfirmButton>
  </div>
)

export default class DisscussForm extends Component {
  componentDidMount () {
    document.body.style.overflow = 'hidden'
  }
  componentWillUnmount () {
    document.body.style.overflow = 'auto'
  }
  render() {
    return (
      <div className="disscuss-form-container">
        <div className="disscuss-form"></div>
        <ButtonGroup></ButtonGroup>
      </div>
    )
  }
}
