import {
  loginError,
  loginSuccess,
  loginRequest,
  addUserError,
  addUserRequest,
  addUserSuccess
} from './index'

// const fakeLogin = (email, password, state) => {
//   const { users, userList } = state.users

//   return userList.find(userId => {
//     return (
//       users[userId].email === email &&
//         users[userId].password === password
//     )
//   })
// }

// export const login = (email, password) => (dispatch, getState) => {
//   dispatch(loginRequest())

//   const userId = fakeLogin(email, password, getState())

//   if (userId) {
//     localStorage.setItem('userId', userId)
//     // ToDo: mover a thunk de registro de usuarios
//     let users_array = []
//     const users = getState().users.users
//     for (var key in users) {
//       // skip loop if the property is from prototype
//       if (!users.hasOwnProperty(key)) continue;
//       var obj = users[key];
//       obj["id"] = key
//       delete obj.password;
//       delete obj.email;
//       users_array.push(obj)
//     }
//     localStorage.setItem('users', JSON.stringify(users_array))
//     dispatch(loginSuccess(userId))
//   } else {
//     dispatch(loginError('Password o email incorrecto'))
//   }
// }
// const uuidv1 = require('uuid/v1')

const fakeLogin = (email, password, state) => {
  const { users, userList } = state.users
  let dataSource = JSON.parse(localStorage.getItem('users'))
  let UserDataSource = dataSource === null ? users : dataSource
  const UsersObjectKeys = []
  for (var key in UserDataSource) {
    if (!UserDataSource.hasOwnProperty(key)) continue
    var obj = UserDataSource[key]
    UsersObjectKeys.push(obj.id)
  }
  console.log('UsersObjectKeys', UsersObjectKeys)
  const loggedUser = UserDataSource.find(user => {
    return (
      user.email === email &&
      user.password === password
    )
  })
  console.log('userId', loggedUser.id)
  return loggedUser.id
}

const fakeAddUser = ({ email, password, name, state }) => {
  const {
    users,
    userList
  } = state.users
  let dataSource = JSON.parse(localStorage.getItem('users'))
  let UserDataSource = dataSource === null ? users : dataSource
  
  // keys
  const UsersObjectKeys = []
  for (var key in UserDataSource) {
    if (!UserDataSource.hasOwnProperty(key)) continue
    var obj = UserDataSource[key]
    UsersObjectKeys.push(obj.id)
  }
  console.log('UsersObjectKeys', UsersObjectKeys)

  const emailExists = Object.keys(UserDataSource).some(uid => UserDataSource[uid].email === email)
  const emaiEmpty = email === ''
  const nameEmpty = name === ''
  const toReturn = {}
  
  if (!emailExists) {
    if (emaiEmpty) {
      toReturn.error = 'Debe ingresar un correo.'
    } else if (nameEmpty) {
      toReturn.error = 'Debe ingresar un nombre.'
    } else {
      toReturn.newId = Math.max.apply(null, UsersObjectKeys) + 1//uuidv1()
    }
  } else {
    toReturn.error = 'Ya existe este usuario.'
  }
  console.log('toReturn', toReturn)
  return toReturn
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

export const addUser = ({ email, password, name }) => (dispatch, getState) => {
  dispatch(addUserRequest())

  const response = fakeAddUser({
    email,
    password,
    name,
    state: getState()
  })

  const {
    error,
    newId
  } = response

  if (!error) {
    dispatch(addUserSuccess({
      id: newId,
      email,
      name,
      password
    }))
    let UsersArray = []
    const users = getState().users.users
    for (var key in users) {
      if (!users.hasOwnProperty(key)) continue
      var obj = users[key]
      obj['id'] = key
      // delete obj.password
      // delete obj.email
      UsersArray.push(obj)
    }
    localStorage.setItem('users', JSON.stringify(UsersArray))
  } else {
    dispatch(addUserError(error))
  }
}
