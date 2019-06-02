import React from 'react'

const MatchesContainer = () => {
  let systemUsers = JSON.parse(localStorage.getItem('users'))
  let CharactersFavourites = JSON.parse(localStorage.getItem('CharactersFavourites'))
  let EpisodesFavourites = JSON.parse(localStorage.getItem('EpisodesFavourites'))
  console.log('CharactersFavourites', CharactersFavourites)
  return (
    <div>
      <h1>Matches</h1>
      <h3>Characters</h3>
      <table className='episode-table'>
        <thead>
          <tr className='episode-row'>
            <th>User</th>
            <th>Episode</th>
            <th>Other Users</th>
          </tr>
        </thead>
        <tbody>
          {}
        </tbody>
      </table>
    </div>
  )
}

export default MatchesContainer
