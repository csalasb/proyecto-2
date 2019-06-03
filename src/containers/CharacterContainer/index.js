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
    userFavourites
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
        const favorito = userFavourites !== undefined ? userFavourites.some(el => el.id === character.id) : false
        return (
          <div key={index} style={{ marginBottom: '20px' }} className={`card ${favorito ? 'favourite' : ''}`} >
            <img src={character.image} alt='Avatar' style={{ width: '300px' }} />
            <div className='container'>
              <h4>
                <b>{character.name}</b>
                <div onClick={() => toggleFavourite(character.id, character.name)} style={{ float: 'right', cursor: 'pointer' }} title='Agregar a favoritos'>{favorito ? '★' : '☆'}</div>
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

  let dataSource = JSON.parse(localStorage.getItem('CharactersFavourites'))
  let userFavourites = dataSource === null ? favourites[localStorage.getItem('userId')] : dataSource[localStorage.getItem('userId')]
  console.log('userid', localStorage.getItem('userId'))
  return {
    loading,
    characters: entities,
    error,
    maxPage,
    currentPage,
    alreadyLoaded,
    userFavourites
  }
}

const mapDispatchToProps = {
  getCharacters,
  loadMore,
  toggleFavourite: toggleFavouriteCreator
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterContainer)
