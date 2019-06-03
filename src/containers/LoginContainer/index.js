import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login as loginCreator } from '../../redux/users/thunks'

const LoginContainer = props => {
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

  const handleChange = (event) => {
    const {
      name,
      value
    } = event.target

    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    login(values.email, values.password)
  }

  if (loggedIn) {
    return <Redirect to='/proyecto-2' />
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        name='email'
        value={values['']}
        onChange={handleChange}
      />
      <input
        type='password'
        name='password'
        value={values['']}
        onChange={handleChange}
      />
      {error}
      {!loading && <button type='submit'>Login</button>}
    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
