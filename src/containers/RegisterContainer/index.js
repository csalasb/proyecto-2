import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addUser as addUserCreator } from '../../redux/users/thunks'

const RegisterContainer = props => {
  const {
    loading,
    addUser,
    error
  } = props

  const [values, setValues] = useState({
    name: '',
    password: '',
    email: ''
  })

  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target

    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    addUser(values)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Ingrese el name'
          value={values['name']}
          onChange={handleChange}
        />
        <input
          type='email'
          name='email'
          placeholder='Ingrese el email'
          value={values['email']}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Ingrese el password'
          value={values['password']}
          onChange={handleChange}
        />
        {error}
        {!loading && (
          <button type='submit'>
            Registrar
          </button>
        )}
      </form>
    </div>
  )
}

const msp = state => {
  const {
    loading,
    error
  } = state.users

  return {
    loading,
    error
  }
}

const mdp = {
  addUser: addUserCreator
}

export default connect(msp, mdp)(RegisterContainer)
