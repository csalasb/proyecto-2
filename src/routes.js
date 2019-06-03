import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import CharacterContainer from './containers/CharacterContainer'
import EpisodeContainer from './containers/EpisodeContainer'
// import NotFound from './containers/NotFound'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './containers/PrivateRoute'
// import LogOutPage from './pages/LogOutPage'
import MatchesPage from './pages/MatchesPage'
import RegisterPage from './pages/RegisterPage'
import NotLoggedInRoute from './containers/NotLoggedInRoute'

const Index = () => <h2>Home</h2>

function AppRouter () {
  return (
    <Router>
      <div>
        <ul className='nav'>
          <li className='nav-item'><Link to='/proyecto-2/'>Home</Link></li>
          <li className='nav-item'><Link to='/proyecto-2/characters/'>Characters</Link></li>
          <li className='nav-item'><Link to='/proyecto-2/episodes/'>Episodes</Link></li>
          <li className='nav-item'><Link to='/proyecto-2/matches/'>Matches</Link></li>
          <li className='nav-item-right active'><a onClick={() => console.log('logout')}>Logout</a></li>
        </ul>
        <NotLoggedInRoute exact path='/proyecto-2/login' component={LoginPage} />
        <NotLoggedInRoute exact path='/proyecto-2/register' component={RegisterPage} />
        <PrivateRoute path='/proyecto-2' exact component={Index} />
        <PrivateRoute path='/proyecto-2/characters/' exact component={CharacterContainer} />
        <PrivateRoute path='/proyecto-2/episodes/' exact component={EpisodeContainer} />
        <PrivateRoute exact path='/proyecto-2/matches' component={MatchesPage} />
        {/* <Route component={NotFound} /> */}
      </div>
    </Router>
  )
}

export default AppRouter
