import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  startPayment,
  fetchExchangeRate
} from '../actions'

import {
  getSettings,
  getTodaysLastPayment
} from '../reducers'

import Dashboard from '../views/dashboard'

class DashboardContainer extends Component {
  componentDidMount () {
    this.props.fetchExchangeRate(this.props.settings.fiatCurrency || 'EUR')
  }

  render () {
    return <Dashboard {...this.props} />
  }
}

const mapStateToProps = (state, { match }) => ({
  lastPayment: getTodaysLastPayment(state),
  settings: getSettings(state)
})

const mapDispatchToProps = (dispatch, { history, match }) => ({
  onStartPayment (e) {
    e.preventDefault()
    return new Promise((resolve, reject) => {
      dispatch(startPayment('EUR', resolve, reject))
    }).then((id) => {
      console.log('payment created', id)
      history.push(`/payments/${id}/create`)
    })
  },
  ...bindActionCreators({
    fetchExchangeRate
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
