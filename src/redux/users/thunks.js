import {
  loginError,
  loginSuccess,
  loginRequest
} from './index'

const fakeLogin = (email, password, state) => {
  const { users, userList } = state.users

  return userList.find(userId => {
    return (
      users[userId].email === email &&
        users[userId].password === password
    )
  })
}

export const login = (email, password) => (dispatch, getState) => {
  dispatch(loginRequest())

  const userId = fakeLogin(email, password, getState())

  if (userId) {
    localStorage.setItem('userId', userId)
    dispatch(loginSuccess(userId))
  } else {
    dispatch(loginError('Password o email incorrecto'))
  }
}

