import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getEpisodes } from '../../redux/episodes/thunks'
import { loadMore } from '../../redux/episodes/thunks'
import './App.css';

const EpisodeContainer = props => {
  const {
    getEpisodes,
    loading,
    episodes,
    error,
    loadMore,
    maxPage,
    currentPage,
    alreadyLoaded
  } = props

  useEffect(() => {
    !alreadyLoaded && getEpisodes()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {error}

        {loading && (
          <div>
            IS LOADING...
          </div>
        )}

        {currentPage}

        {!loading && episodes.map((episode, index) => (
          <div key={index} style={{marginBottom: '20px'}}>
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
  );
}

const mapStateToProps = state => {
  const {
    loading,
    entities,
    error,
    maxPage,
    currentPage,
    alreadyLoaded
  } = state.episodes

  return {
    loading,
    episodes: entities,
    error,
    maxPage,
    currentPage
  }
}
 
const mapDispatchToProps = {
  getEpisodes,
  loadMore
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeContainer)
