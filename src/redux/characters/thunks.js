import axios from "axios";
import {
  getCharactersRequest,
  getCharactersSuccess,
  getCharactersFail
} from './index'

const baseApiUrl = 'https://rickandmortyapi.com/api/character/'

export const getCharacters = () => {
  return async (dispatch, getState) => {
    dispatch(getCharactersRequest())

    try {
      const response = await axios.get(baseApiUrl)

      dispatch(
        getCharactersSuccess(response.data.results)
      )
    } catch (e) {
      const error = new Error(e)

      dispatch(getCharactersFail(error.toString()))
    }   
  }
}