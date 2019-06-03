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
    // ToDo: mover a thunk de registro de usuarios
    let users_array = []
    const users = getState().users.users
    for (var key in users) {
      // skip loop if the property is from prototype
      if (!users.hasOwnProperty(key)) continue;
      var obj = users[key];
      obj["id"] = key
      delete obj.password;
      delete obj.email;
      users_array.push(obj)
    }
    localStorage.setItem('users', JSON.stringify(users_array))
    dispatch(loginSuccess(userId))
  } else {
    dispatch(loginError('Password o email incorrecto'))
  }
}

