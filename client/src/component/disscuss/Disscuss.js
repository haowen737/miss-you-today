import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Transition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import Axios from 'axios'

import DisscussHeader from './DisscussHeader'
import DisscussForm from './DisscussForm'

import { themeChange } from './../../actions'

import { BlogTheme } from './../../Hero.service'

import './Disscuss.css'
import { defaultStyle, transitionStyles } from './TransitionConfig'

const DisscussItem = ({ children, index }) => {
  return (
    <Transition in={true} appear={true} timeout={(50 + (50 * index))}>
      {(state) => (
        <li 
        style={{
          ...defaultStyle,
          ...{transform: `translate3d(0, -${index * 10}%, 0)`},
          ...transitionStyles[state]
        }}>
          {children}
        </li>
      )}
    </Transition>
  )
}

const DisscussAdd = ({ onClickAdd, formIn }) => {
  return (
    <a style={formIn ? {transform: `translate3d(0, 100px, 0)`} : {}}
    className="disscuss-add"
    onClick={onClickAdd}></a>
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
    this.setState({ formIn: true })
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
    console.log('click cancel')
  }
  onClickConfirm () {
    console.log('click confirm')
  }
  render() {
    const { disscussList, itemIn, formIn } = this.state
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
            disscussList.map((item, i) => (
              <DisscussItem
              key={i}
              item={item}
              itemIn={itemIn}
              index={i}>
                <p className="disscuss-name">{item.user_name}</p>
                <h2 className="disscuss-content">{item.content}</h2>
              </DisscussItem>
            ))
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme
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
