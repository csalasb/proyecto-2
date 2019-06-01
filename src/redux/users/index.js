const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_ERROR = 'LOGIN_ERROR'
const LOG_OUT = 'LOG_OUT'

export const loginRequest = () => ({
  type: LOGIN_REQUEST
})

export const loginSuccess = userId => ({
  type: LOGIN_SUCCESS,
  payload: {
    userId
  }
})

export const loginError = error => ({
  type: LOGIN_ERROR,
  payload: {
    error
  }
})

export const logOut = userId => ({
  type: LOG_OUT,
  payload: {
    userId
  }
})

const initialState = {
  users: {
    '1': {
      name: 'Manolo',
      password: '123',
      email: 'manolo@rm.com'
    },
    '2': {
      name: 'Manuela',
      password: '123',
      email: 'manuela@rm.com'
    }
  },
  userList: ['1', '2'],
  loggedIn: null,
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: action.payload.userId,
        loading: false,
        error: null
      }
    }

    case LOGIN_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        loading: false
      }
    }

    case LOG_OUT: {
      return {
        ...state,
        loggedIn: null,
        loading: false,
        error: null
      }
    }

    default: return state
  }
}
