import { combineReducers } from 'redux'
import charactersReducer from './characters'
import episodesReducer from './episodes'

export default combineReducers({
  characters: charactersReducer,
  episodes: episodesReducer
})
