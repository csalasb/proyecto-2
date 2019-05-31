import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getEpisodes } from '../../redux/episodes/thunks'
import { loadMore } from '../../redux/episodes/thunks'
import { toggleFavourite as toggleFavouriteCreator } from '../../redux/episodes'

const EpisodeContainer = props => {
  const {
    getEpisodes,
    loading,
    episodes,
    error,
    loadMore,
    maxPage,
    currentPage,
    alreadyLoaded,
    toggleFavourite,
    favourites
  } = props

  useEffect(() => {
    !alreadyLoaded && getEpisodes()
  }, [])

  return (
    <div>
      <div className='load-more' >
        {error}

        {loading && (
          <div>
            IS LOADING...
          </div>
        )}
        <div>
          {currentPage < maxPage && <button className='button' onClick={loadMore}>Ver más</button>}
        </div>
      </div>

      {/* {!loading && episodes.map((episode, index) => (
        <div key={index} style={{ marginBottom: '20px' }} className={`${favourites.indexOf(episode.id) !== -1 ? 'favourite' : ''}`} >
          <div>
            {<button onClick={() => toggleFavourite(episode.id)}>Favorito</button>}
          </div>
          <div>
            id: {episode.id}
          </div>
          <div>
            name: {episode.name}
          </div>
        </div>
      ))} */}
      <table className='episode-table'>
        <thead>
          <tr className='episode-row'>
            <th>Episode</th>
            <th>Name</th>
            <th>Air date</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {episodes.map((episode, index) => {
            const favorito = favourites.indexOf(episode.id) !== -1
            return (
              <tr key={index} className={`${favorito ? 'favourite' : ''}`}>
                <td>{episode.episode}</td>
                <td>{episode.name}</td>
                <td>{episode.air_date}</td>
                <td><div onClick={() => toggleFavourite(episode.id)} style={{ float: 'right', cursor: 'pointer' }} title='Agregar a favoritos'>{favorito ? '⭐' : '☆'}</div></td>
              </tr>
            )
          })
          }
        </tbody>
      </table>

      <div className='load-more'>
        {currentPage < maxPage && <button className='button' onClick={loadMore}>Ver más</button>}
      </div>
      
    </div>
  )
}

const mapStateToProps = state => {
  const {
    loading,
    entities,
    error,
    maxPage,
    currentPage,
    alreadyLoaded,
    favourites
  } = state.episodes

  return {
    loading,
    episodes: entities,
    error,
    maxPage,
    currentPage,
    alreadyLoaded,
    favourites
  }
}

const mapDispatchToProps = {
  getEpisodes,
  loadMore,
  toggleFavourite: toggleFavouriteCreator
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeContainer)
