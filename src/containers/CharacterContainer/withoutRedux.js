import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

const CharacterContainer = props => {
  const [characters, setCharacters] = useState([])
  const [infoPage, setInfoPage] = useState({
    currentPage: 1,
    next: '',
    maxPage: null
  })

  useEffect(() => {
    const getApi = async () => {
      const response = await axios.get('https://rickandmortyapi.com/api/character/')
      
      setCharacters(response.data.results)

      setInfoPage({
        ...infoPage,
        next: response.data.info.next,
        maxPage: response.data.info.pages
      })
    }
  
    getApi()
  }, [])

  const loadMore = async () => {
    const { next, currentPage } = infoPage

    const response = await axios.get(next)
      
    setCharacters([...characters, ...response.data.results])

    setInfoPage({
      ...infoPage,
      next: response.data.info.next,
      currentPage: currentPage + 1
    })
  }

  const { maxPage, currentPage } = infoPage

  return (
    <div className="App">
      <header className="App-header">
        {characters.map((character, index) => (
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

export default CharacterContainer;
