import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { getCharacters } from '../../redux/characters/thunks'
import { loadMore } from '../../redux/characters/thunks'
import './App.css';

const CharacterContainer = props => {
  const {
    getCharacters,
    loading,
    characters,
    error,
    loadMore,
    maxPage,
    currentPage,
    alreadyLoaded
  } = props

  useEffect(() => {
    !alreadyLoaded && getCharacters()
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

        {!loading && characters.map((character, index) => (
          <div key={index} style={{marginBottom: '20px'}}>
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
  } = state.characters

  return {
    loading,
    characters: entities,
    error,
    maxPage,
    currentPage,
    alreadyLoaded
  }
}
 
const mapDispatchToProps = {
  getCharacters,
  loadMore
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterContainer);