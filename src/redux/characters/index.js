const GET_CHARACTERS_REQUEST = 'GET_CHARACTERS_REQUEST'
const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS'
const GET_CHARACTERS_FAIL = 'GET_CHARACTERS_FAIL'
const LOAD_MORE_UPDATE_CHARACTERS = 'LOAD_MORE_UPDATE_CHARACTERS'
const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE'

export const getCharactersRequest = () => ({ type: GET_CHARACTERS_REQUEST })

export const getCharactersSuccess = (data) => ({
  type: GET_CHARACTERS_SUCCESS,
  payload: {
    data
  }
})

export const getCharactersFail = (error) => ({
  type: GET_CHARACTERS_FAIL,
  payload: {
    error
  }
})

export const loadMoreUpdate = (data) => ({
  type: LOAD_MORE_UPDATE_CHARACTERS,
  payload: {
    data
  }
})

export const toggleFavourite = id => {
  return ({
    type: TOGGLE_FAVOURITE,
    payload: {
      id
    }
  })
}

const initialState = {
  entities: [],
  loading: false,
  currentPage: 1,
  next: '',
  maxPage: null,
  alreadyLoaded: false,
  favourites: { '1': [], '2': [] }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHARACTERS_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case GET_CHARACTERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        entities: [
          ...state.entities,
          ...action.payload.data.results
        ],
        next: action.payload.data.info.next,
        maxPage: action.payload.data.info.pages,
        alreadyLoaded: true
      }
    }

    case GET_CHARACTERS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    }

    case LOAD_MORE_UPDATE_CHARACTERS: {
      return {
        ...state,
        currentPage: state.currentPage + 1
      }
    }

    case TOGGLE_FAVOURITE: {
      const { id } = action.payload
      let dataSource = JSON.parse(localStorage.getItem('CharactersFavourites'))
      let userFavourites = dataSource === null ? state.favourites[localStorage.getItem('userId')] : dataSource[localStorage.getItem('userId')]
      // let userFavourites = JSON.parse(localStorage.getItem('CharactersFavourites'))[localStorage.getItem('userId')]
      let filteredFavourites = dataSource === null ? state.favourites : dataSource
      if (userFavourites.indexOf(id) !== -1) {
        if (userFavourites.length > 0) {
          filteredFavourites[localStorage.getItem('userId')] = userFavourites.filter(function (value) {
            return value !== id
          })
        }
      } else {
        filteredFavourites[localStorage.getItem('userId')] = [...userFavourites, id]
      }
      localStorage.setItem('CharactersFavourites', JSON.stringify(filteredFavourites))
      return {
        ...state,
        favourites: filteredFavourites
      }
    }

    default: return state
  }
}
