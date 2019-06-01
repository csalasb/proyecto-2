const GET_EPISODES_REQUEST = 'GET_EPISODES_REQUEST'
const GET_EPISODES_SUCCESS = 'GET_EPISODES_SUCCESS'
const GET_EPISODES_FAIL = 'GET_EPISODES_FAIL'
const LOAD_MORE_UPDATE_EPISODES = 'LOAD_MORE_UPDATE_EPISODES'
const TOGGLE_FAVOURITE_EPISODES = 'TOGGLE_FAVOURITE_EPISODES'

export const getEpisodesRequest = () => ({ type: GET_EPISODES_REQUEST })

export const getEpisodesSuccess = (data) => ({
  type: GET_EPISODES_SUCCESS,
  payload: {
    data
  }
})

export const getEpisodesFail = (error) => ({
  type: GET_EPISODES_FAIL,
  payload: {
    error
  }
})

export const loadMoreUpdate = (data) => ({
  type: LOAD_MORE_UPDATE_EPISODES,
  payload: {
    data
  }
})

export const toggleFavourite = id => {
  return ({
    type: TOGGLE_FAVOURITE_EPISODES,
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
  switch (action.type) {
    case GET_EPISODES_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case GET_EPISODES_SUCCESS: {
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

    case GET_EPISODES_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    }

    case LOAD_MORE_UPDATE_EPISODES: {
      return {
        ...state,
        currentPage: state.currentPage + 1
      }
    }

    default: return state

    case TOGGLE_FAVOURITE_EPISODES: {
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
  }
}