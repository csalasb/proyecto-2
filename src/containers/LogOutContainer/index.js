import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout as logoutCreator } from '../../redux/users/thunks'

const LogOutContainer = props => {
  const {
    logout,
    loggedIn
  } = props

  useEffect(() => {
    logout()
  }, [])

  if (loggedIn) {
    return <Redirect to='/proyecto-2' />
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
  logout: logoutCreator
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOutContainer)
