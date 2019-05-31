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
  favourites: []
}

export default (state = initialState, action) => {
  console.log('action.type characters', action.type)
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
      let filteredFavourites = state.favourites
      if (state.favourites.indexOf(id) !== -1) {
        if (state.favourites.length > 0) {
          filteredFavourites = state.favourites.filter(function (value) {
            return value !== id
          })
        }
      } else {
        filteredFavourites = [...state.favourites, id]
      }
      return {
        ...state,
        favourites: filteredFavourites
      }
    }

    default: return state
  }
}
