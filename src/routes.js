import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import CharacterContainer from './containers/CharacterContainer'
import EpisodeContainer from './containers/EpisodeContainer'
// import NotFound from './containers/NotFound'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './containers/PrivateRoute'
// import LogOutPage from './pages/LogOutPage'

const Index = () => <h2>Home</h2>

function AppRouter () {
  return (
    <Router>
      <div>
        <ul className='nav'>
          <li className='nav-item'><Link to='/'>Home</Link></li>
          <li className='nav-item'><Link to='/characters/'>Characters</Link></li>
          <li className='nav-item'><Link to='/episodes/'>Episodes</Link></li>
          <li className='nav-item-right active'><a onClick={() => console.log('logout')}>Logout</a></li>
        </ul>
        <Route path='/' exact component={Index} />
        <Route exact path='/login' component={LoginPage} />
        {/* <Route exact path='/logout' component={LogOutPage} /> */}
        <PrivateRoute path='/characters/' exact component={CharacterContainer} />
        <PrivateRoute path='/episodes/' exact component={EpisodeContainer} />
        {/* <Route component={NotFound} /> */}
      </div>
    </Router>
  )
}

export default AppRouter
