import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { getCharacters } from '../../redux/characters/thunks'
import './App.css';

const CharacterContainer = props => {
  const {
    getCharacters,
    loading,
    characters,
    error
  } = props

  useEffect(() => {
    getCharacters()
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
      </header>
    </div>
  );
}

const mapStateToProps = state => {
  const {
    loading,
    entities,
    error
  } = state.characters

  return {
    loading,
    characters: entities,
    error
  }
}
 
const mapDispatchToProps = {
  getCharacters
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterContainer);
