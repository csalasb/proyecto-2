import { combineReducers } from 'redux'
import charactersReducer from './characters'
import episodesReducer from './episodes'
import userReducer from './users'

export default combineReducers({
  characters: charactersReducer,
  episodes: episodesReducer,
  users: userReducer
})
