import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login as loginCreator } from '../../redux/users/thunks'

const LogOutContainer = props => {
  const {
    loggedIn,
    login,
    error,
    loading
  } = props

  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  if (loggedIn) {
    return <Redirect to='/' />
  }

  return (
    <div>Saliendo...</div>
  )
}

const mapStateToProps = state => {
  const {
    loggedIn,
    loading,
    error
  } = state.users

  return {
    loggedIn,
    loading,
    error
  }
}

const mapDispatchToProps = {
  login: loginCreator
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOutContainer)
