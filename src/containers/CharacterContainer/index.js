import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCharacters } from '../../redux/characters/thunks'
import { loadMore } from '../../redux/characters/thunks'
import { toggleFavourite as toggleFavouriteCreator } from '../../redux/characters'
import LoadMore from '../../components/LoadMore'
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
    <div>
      <div>
        {error}
        <LoadMore loadMore={loadMore} maxPage={maxPage} currentPage={currentPage} loading={loading} />
      </div>

      {characters.map((character, index) => {
        const favorito = favourites.indexOf(character.id) !== -1
        return (
          <div key={index} style={{ marginBottom: '20px' }} className={`card ${favorito ? 'favourite' : ''}`} >
            <img src={character.image} alt='Avatar' style={{ width: '300px' }} />
            <div className='container'>
              <h4>
                <b>{character.name}</b>
                <div onClick={() => toggleFavourite(character.id)} style={{ float: 'right', cursor: 'pointer' }} title='Agregar a favoritos'>{favorito ? '★' : '☆'}</div>
              </h4>
              <p>{character.species}</p>
              <p>{character.origin.name}</p>
            </div>
          </div>
        )
      })}

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
