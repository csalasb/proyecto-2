import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCharacters } from '../../redux/characters/thunks'
import { loadMore } from '../../redux/characters/thunks'
import { toggleFavourite as toggleFavouriteCreator } from '../../redux/characters'
import './App.css'

const CharacterContainer = props => {
  const {
    getCharacters,
    loading,
    characters,
    error,
    loadMore,
    maxPage,
    currentPage,
    alreadyLoaded,
    toggleFavourite,
    favourites
  } = props

  useEffect(() => {
    !alreadyLoaded && getCharacters()
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

        {!loading && characters.map((character, index) => (
          <div key={index} style={{ marginBottom: '20px' }} className={`${favourites.indexOf(character.id) !== -1 ? 'favourite' : ''}`} >
            <div>
              {<button onClick={() => toggleFavourite(character.id)}>Favorito</button>}
            </div>
            <div>
             id: {character.id}
            </div>
            <div>
             name: {character.name}
            </div>
            <div>
             species: {character.species}
            </div>
            <div>
             origin: {character.origin.name}
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
  } = state.characters

  return {
    loading,
    characters: entities,
    error,
    maxPage,
    currentPage,
    alreadyLoaded,
    favourites
  }
}

const mapDispatchToProps = {
  getCharacters,
  loadMore,
  toggleFavourite: toggleFavouriteCreator
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterContainer)
