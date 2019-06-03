import React from 'react'
import { connect } from 'react-redux'

const MatchesContainer = props => {
  const {
    users
  } = props
  let systemUsers = JSON.parse(localStorage.getItem('users'))
  let CharactersFavourites = JSON.parse(localStorage.getItem('CharactersFavourites'))
  let EpisodesFavourites = JSON.parse(localStorage.getItem('EpisodesFavourites'))
  return (
    <div>
      <h1>Matches</h1>
      <h3>Characters</h3>
      <table className='episode-table'>
        <thead>
          <tr className='episode-row'>
            <th>User</th>
            <th>Characters</th>
            <th>Other Users</th>
          </tr>
        </thead>
        <tbody>
          {/* {systemUsers.map((user) => {
            let CharactersFavouritesUser = CharactersFavourites[user.id]
            return(
              <tr>
                <td>{user.name}</td>
                <td>{CharactersFavouritesUser.map(e => e.name).join(", ")}</td>
              </tr>
            )
          })} */}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
  const {
    users
  } = state.users

  return {
    users
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchesContainer)
