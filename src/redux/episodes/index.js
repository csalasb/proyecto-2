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

export const toggleFavourite = (id, name) => {
  return ({
    type: TOGGLE_FAVOURITE_EPISODES,
    payload: {
      id,
      name
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
      const { id, name } = action.payload
      let dataSource = JSON.parse(localStorage.getItem('EpisodesFavourites'))
      let userFavourites = dataSource === null ? state.favourites[localStorage.getItem('userId')] : dataSource[localStorage.getItem('userId')]
      let filteredFavourites = dataSource === null ? state.favourites : dataSource
      userFavourites = userFavourites === undefined ? [] : userFavourites
      const found = userFavourites.some(el => el.id === id)
      if (found) {
        if (userFavourites.length > 0) {
          filteredFavourites[localStorage.getItem('userId')] = userFavourites.filter(function (value) {
            return value.id !== id
          })
        }
      } else {
        filteredFavourites[localStorage.getItem('userId')] = [...userFavourites, { id: id, name: name }]
      }
      localStorage.setItem('EpisodesFavourites', JSON.stringify(filteredFavourites))
      return {
        ...state,
        favourites: filteredFavourites
      }
    }
  }
}