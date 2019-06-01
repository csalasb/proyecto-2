import React, { useEffect } from 'react'
import { connect as conecta } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { loginSuccess as loginSuccessCreator } from '../../redux/users/'

const PrivateRoute = props => {
  const {
    loggedIn,
    component: Component,
    setUserId,
    ...rest
  } = props

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    if (userId) {
      setUserId(userId)
    }
  }, [])

  return (
    <Route
      {...rest}
      render={props => {
        if (loggedIn || userId) {
          return <Component {...props} />
        } else {
          return <Redirect to='/login' />
        }
      }}
    />
  )
}

const msp = state => {
  const {
    loggedIn
  } = state.users

  return {
    loggedIn
  }
}

const mdp = {
  setUserId: loginSuccessCreator
}

export default conecta(msp, mdp)(PrivateRoute)
