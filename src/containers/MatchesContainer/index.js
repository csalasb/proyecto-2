import React from 'react'
import { connect } from 'react-redux'

const MatchesContainer = props => {
  const {
    CharactersStateFavourites,
    EpisodesStateFavourites
  } = props
  let systemUsers = JSON.parse(localStorage.getItem('users'))
  console.log('CharactersStateFavourites', CharactersStateFavourites)
  let CharactersDataSource = JSON.parse(localStorage.getItem('CharactersFavourites'))
  let CharactersFavourites = CharactersDataSource === null ? CharactersStateFavourites : CharactersDataSource
  // let CharactersFavourites = JSON.parse(localStorage.getItem('CharactersFavourites'))
  console.log('CharactersFavourites', CharactersFavourites)
  let EpisodesDataSource = JSON.parse(localStorage.getItem('EpisodesFavourites'))
  let EpisodesFavourites = EpisodesDataSource === null ? EpisodesStateFavourites : EpisodesDataSource
  // let EpisodesFavourites = JSON.parse(localStorage.getItem('EpisodesFavourites'))
  return (
    <div className='container'>
      <h1>Matches</h1>
      <h3>Characters</h3>
      <table className='episode-table'>
        <thead>
          <tr className='episode-row'>
            <th>Characters</th>
          </tr>
        </thead>
        <tbody>
          {
            CharactersFavourites[localStorage.getItem('userId')].map(function (character, index) {
              const matchUsersCharacters = []
              Object.keys(systemUsers).map(function (objectKey, index) {
                var user = systemUsers[objectKey]
                if (user.id !== localStorage.getItem('userId')) {
                  const found = CharactersFavourites[user.id].some(el => el.id === character.id)
                  if (found) {
                    matchUsersCharacters.push(user.name)
                  }
                }
              })
              return (
                <tr key={character.id}>
                  <td>{`${character.name}${matchUsersCharacters.length > 0 ? '. Le gusta también a: ' + matchUsersCharacters.join(', ') : ''}`}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <br />
      <h3>Episodes</h3>
      <table className='episode-table'>
        <thead>
          <tr className='episode-row'>
            <th>Characters</th>
          </tr>
        </thead>
        <tbody>
          {
            EpisodesFavourites[localStorage.getItem('userId')].map(function (character, index) {
              const matchUsersEpisodes = []
              Object.keys(systemUsers).map(function (objectKey, index) {
                var user = systemUsers[objectKey]
                if (user.id !== localStorage.getItem('userId')) {
                  const found = EpisodesFavourites[user.id].some(el => el.id === character.id)
                  if (found) {
                    matchUsersEpisodes.push(user.name)
                  }
                }
              })
              return (
                <tr key={character.id}>
                  <td>{`${character.name}${matchUsersEpisodes.length > 0 ? '. Le gusta también a: ' + matchUsersEpisodes.join(', ') : ''}`}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
  const {
    favourites: CharactersStateFavourites
  } = state.characters
  const {
    favourites: EpisodesStateFavourites
  } = state.episodes

  return {
    CharactersStateFavourites,
    EpisodesStateFavourites
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchesContainer)
