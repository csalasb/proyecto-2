import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import CharacterContainer from './containers/CharacterContainer'
import EpisodeContainer from './containers/EpisodeContainer'
import NotFound from './containers/NotFound'

const Index = () => <h2>Home</h2>
const Characters = () => <CharacterContainer />
const Episodes = () => <EpisodeContainer />

function AppRouter () {
  return (
    <Router>
      <div>
        <ul className='nav'>
          <li className='nav-item'><Link to='/'>Home</Link></li>
          <li className='nav-item'><Link to='/characters/'>Characters</Link></li>
          <li className='nav-item'><Link to='/episodes/'>Episodes</Link></li>
          <li className='nav-item-right active'><a href='#logout'>Logout</a></li>
        </ul>
        <Switch>
          <Route path='/' exact component={Index} />
          <Route path='/characters/' exact component={Characters} />
          <Route path='/episodes/' exact component={Episodes} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter
