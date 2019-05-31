import axios from 'axios'
import {
  getCharactersRequest,
  getCharactersSuccess,
  getCharactersFail,
  loadMoreUpdate
} from './index'

const baseApiUrl = 'https://rickandmortyapi.com/api/character/'

export const getCharacters = () => {
  return async (dispatch, getState) => {
    dispatch(getCharactersRequest())

    try {
      const response = await axios.get(baseApiUrl)

      dispatch(
        getCharactersSuccess(response.data)
      )
    } catch (e) {
      const error = new Error(e)

      dispatch(getCharactersFail(error.toString()))
    }
  }
}

export const loadMore = () => {
  return async (dispatch, getState) => {
    dispatch(getCharactersRequest())

    try {
      const response = await axios.get(getState().characters.next)

      dispatch(loadMoreUpdate(response.data))
      dispatch(
        getCharactersSuccess(response.data)
      )
    } catch (e) {
      const error = new Error(e)

      dispatch(getCharactersFail(error.toString()))
    }
  }
}
