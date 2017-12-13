import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Transition, TransitionGroup } from 'react-transition-group'
import Axios from 'axios'
import { connect } from 'react-redux'

import DisscussHeader from './DisscussHeader'
import DisscussForm from './DisscussForm'

import { themeChange } from './../../actions'

import { BlogTheme } from './../../Hero.service'

import './Disscuss.css'
import { defaultStyle, transitionStyles } from './../blogTags/TransitionConfig'

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

const DisscussAdd = ({ onClickAdd }) => {
  return (
    <a className="disscuss-add" onClick={onClickAdd}></a>
  )
}

class Disscuss extends Component {
  constructor () {
    super()
    this.state = {
      disscussList: []
    }
  }
  componentDidMount () {
    this.props.themeChange(BlogTheme)
    this.getDisscuss()
  }
  onClickAdd () {
    console.log('click add')
  }
  getDisscuss () {
    Axios
      .get('/api/comment/getComments')
      .then(({ data }) => {
        this.setState({
          disscussList: data.reverse()
        })
      })
      .catch(({data}) => {
        // this.$warning(data.msg)
      })
  }
  render() {
    const { disscussList, itemIn } = this.state
    return (
      <div className="disscuss-layout">
        <DisscussHeader></DisscussHeader>
        <DisscussAdd onClickAdd={this.onClickAdd}></DisscussAdd>
        <DisscussForm onClickAdd={this.onClickAdd}></DisscussForm>
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
