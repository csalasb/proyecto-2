const GET_CHARACTERS_REQUEST = 'GET_CHARACTERS_REQUEST'
const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS'
const GET_CHARACTERS_FAIL = 'GET_CHARACTERS_FAIL'
const LOAD_MORE_UPDATE_CHARACTERS = 'LOAD_MORE_UPDATE_CHARACTERS'

export const getCharactersRequest = () => ({ type: GET_CHARACTERS_REQUEST })

// export const getCharactersSuccess = (characters) => ({
//   type: GET_CHARACTERS_SUCCESS,
//   payload: {
//     characters
//   }
// })
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

const initialState = {
  entities: [],
  loading: false,
  currentPage: 1,
  next: '',
  maxPage: null,
  alreadyLoaded: false
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

    // case GET_CHARACTERS_SUCCESS: {
    //   return {
    //     ...state,
    //     loading: false,
    //     entities: [
    //       ...state.entities,
    //       ...action.payload.characters
    //     ],
    //     alreadyLoaded: true
    //   }
    // }
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

    default: return state
  }
}