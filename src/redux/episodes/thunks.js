import axios from "axios";
import {
  getEpisodesRequest,
  getEpisodesSuccess,
  getEpisodesFail,
  loadMoreUpdate
} from './index'

const baseApiUrl = 'https://rickandmortyapi.com/api/episode/'

export const getEpisodes = () => {
  return async (dispatch, getState) => {
    dispatch(getEpisodesRequest())

    try {
      const response = await axios.get(baseApiUrl)

      dispatch(
        getEpisodesSuccess(response.data)
      )
    } catch (e) {
      const error = new Error(e)

      dispatch(getEpisodesFail(error.toString()))
    }   
  }
}

export const loadMore = () => {
  return async (dispatch, getState) => {
    dispatch(getEpisodesRequest())
    
    try {
      const response = await axios.get(getState().characters.next)

      dispatch(loadMoreUpdate(response.data))
      dispatch(
        getEpisodesSuccess(response.data)
      )
    } catch (e) {
      const error = new Error(e)

      dispatch(getEpisodesFail(error.toString()))
    }   
  }
}