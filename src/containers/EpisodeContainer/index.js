import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getEpisodes } from '../../redux/episodes/thunks'
import { loadMore } from '../../redux/episodes/thunks'
import { toggleFavourite as toggleFavouriteCreator } from '../../redux/episodes'
import './App.css'

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
    <div className='App'>
      <header className='App-header'>
        {error}

        {loading && (
          <div>
            IS LOADING...
          </div>
        )}

        {!loading && episodes.map((episode, index) => (
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
        ))}
        {currentPage < maxPage && <button onClick={loadMore}>Ver más</button>}
      </header>
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
