import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getEpisodes } from '../../redux/episodes/thunks'
import { loadMore } from '../../redux/episodes/thunks'
import { toggleFavourite as toggleFavouriteCreator } from '../../redux/episodes'
import LoadMore from '../../components/LoadMore'

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
    favourites,
    userFavourites
  } = props

  useEffect(() => {
    !alreadyLoaded && getEpisodes()
  }, [])

  return (
    <div>
      <div>
        {error}
        <LoadMore loadMore={loadMore} maxPage={maxPage} currentPage={currentPage} loading={loading} />
      </div>
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
            const favorito = userFavourites.indexOf(episode.id) !== -1
            return (
              <tr key={index} className={`${favorito ? 'favourite' : ''}`}>
                <td>{episode.episode}</td>
                <td>{episode.name}</td>
                <td>{episode.air_date}</td>
                <td><div onClick={() => toggleFavourite(episode.id)} style={{ cursor: 'pointer', textAlign: 'center' }} title='Agregar a favoritos'>{favorito ? '★' : '☆'}</div></td>
              </tr>
            )
          })
          }
        </tbody>
      </table>

      <LoadMore loadMore={loadMore} maxPage={maxPage} currentPage={currentPage} loading={loading} />
      
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

  let dataSource = JSON.parse(localStorage.getItem('EpisodesFavourites'))
  let userFavourites = dataSource === null ? favourites[localStorage.getItem('userId')] : dataSource[localStorage.getItem('userId')]

  return {
    loading,
    episodes: entities,
    error,
    maxPage,
    currentPage,
    alreadyLoaded,
    favourites,
    userFavourites
  }
}

const mapDispatchToProps = {
  getEpisodes,
  loadMore,
  toggleFavourite: toggleFavouriteCreator
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeContainer)
