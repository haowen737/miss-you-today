import React, { Component } from 'react'
import { Transition } from 'react-transition-group'
import { connect } from 'react-redux'
import Axios from 'axios'

import DisscussHeader from './DisscussHeader'
import DisscussForm from './DisscussForm'
import DisscussReply from './DisscussReply'

import { themeChange, checkUser } from './../../actions'
import { BlogTheme } from './../../Hero.service'
import { defaultStyle, transitionStyles } from './TransitionConfig'

import './Disscuss.css'

const DisscussItem = ({ children, index }) => {
  return (
    <Transition in={true} appear={true} timeout={(50 + (50 * index))}>
      {(state) => (
        <li
        className="disscuss-item"
        style={{
          ...defaultStyle,
          ...transitionStyles[state],
          ...{transformDuration: `${index * 10 + 100}ms`}
        }}>
          {children}
        </li>
      )}
    </Transition>
  )
}

const DisscussItemChild = ({ children }) => (
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
              <span className="disscuss-children-name">{child.user_name}: </span>
              {child.content}
            </li>
          )}
        </Transition>
      ))
    }
  </ul>
)

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
      disscussList: [],
      formIn: false
    }
  }
  componentDidMount () {
    this.props.themeChange(BlogTheme)
    this.getDisscuss()
  }
  onClickAdd () {
    const { user, history } = this.props
    user ? this.setState({ formIn: true }) : history.push('/signin')
  }
  getDisscuss () {
    Axios
      .get('/api/comment/getComments')
      .then(({ data }) => {
        this.setState({ disscussList: data.reverse(), formIn: false })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  onClickCancel () {
    this.setState({ formIn: false })
  }
  onClickConfirm () {
    console.log('click confirm')
  }
  onClickShowReply (item, i, disscussList) {
    disscussList[i].showReply = item.showReply ? false : true
    this.setState({ disscussList })
  }
  onReplySent () {
    console.log('发送成功')
    this.getDisscuss()
  }
  render() {
    const { disscussList, itemIn, formIn, replyValue } = this.state
    return (
      <div className="disscuss-layout">
        <DisscussHeader></DisscussHeader>
        <DisscussAdd formIn={formIn} onClickAdd={this.onClickAdd.bind(this)}></DisscussAdd>
        <DisscussForm
        formIn={formIn}
        onFormSent={this.getDisscuss.bind(this)}
        onClickCancel={this.onClickCancel.bind(this)}
        onClickConfirm={this.onClickConfirm.bind(this)}
        ></DisscussForm>
        <ul className="discuss-list">
          {
            disscussList.map((item, i, disscussList) => (
              <React.Fragment key={i}>
                <DisscussItem
                item={item}
                itemIn={itemIn}
                index={i}>
                  <p className="disscuss-name">@&nbsp;{item.user_name}</p>
                  <h2 className="disscuss-content">{item.content}</h2>
                  <a className="discuss-reply" onClick={this.onClickShowReply.bind(this, item, i, disscussList)}>回复</a>
                </DisscussItem>
                {
                  item.children.length
                  ? <DisscussItemChild children={item.children} />
                  : null
                }
                {
                  item.showReply
                  && <DisscussReply
                  onClickCancel={this.onClickShowReply.bind(this, item, i, disscussList)}
                  onReplySent={this.onReplySent.bind(this)}
                  item={item} />
                }
              </React.Fragment>
            ))
          }
        </ul>
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
