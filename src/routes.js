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
        <Link to='/'>Home</Link>
        <Link to='/characters/'>Characters</Link>
        <Link to='/episodes/'>Episodes</Link>
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
