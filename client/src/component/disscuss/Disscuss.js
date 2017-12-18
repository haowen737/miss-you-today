import React, { Component } from 'react'
import { connect } from 'react-redux'

import DisscussHeader from './DisscussHeader'
import DisscussForm from './DisscussForm'
import DisscussList from './DisscussList'

import { themeChange, checkUser } from './../../actions'
import { BlogTheme } from './../../Hero.service'

import './Disscuss.css'

const DisscussAdd = ({ onClickAdd, formIn }) => {
  return (
    <a style={formIn ? {transform: `translate3d(0, 100px, 0)`} : {}}
    className="disscuss-add"
    onClick={onClickAdd}>留言</a>
  )
}

class Disscuss extends Component {
  constructor () {
    super()
    this.state = {
      formIn: false,
      replyTo: null
    }
  }
  componentDidMount () {
    this.props.themeChange(BlogTheme)
  }
  onClickAdd () {
    const { user, history } = this.props
    user.id ? this.setState({ formIn: true }) : history.push('/signin')
  }
  onClickCancel () {
    this.setState({ formIn: false })
  }
  onClickConfirm () {
    this.setState({ formIn: false })
  }
  onReplySent () {
    this.getDisscuss()
    this.setState({ formIn: false })
  }
  onFormSent () {
    console.log('onFormSent!!')
    this.getDisscuss()
  }
  render() {
    const { disscussList, itemIn, formIn, replyValue, replyTo } = this.state
    const { user } = this.props
    return (
      <div className="disscuss-layout">
        <DisscussHeader></DisscussHeader>
        <DisscussAdd formIn={formIn} onClickAdd={this.onClickAdd.bind(this)}></DisscussAdd>
        <DisscussForm
        user={user}
        formIn={formIn}
        onFormSent={this.onFormSent.bind(this)}
        onClickCancel={this.onClickCancel.bind(this)}
        onClickConfirm={this.onClickConfirm.bind(this)} />
        <DisscussList
        user={user}
        onReplySent={this.onFormSent.bind(this)} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    themeChange: theme => {
      dispatch(themeChange(theme))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Disscuss)
