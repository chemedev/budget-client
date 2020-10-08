import React, { useState } from 'react'
import Login from './components/Login/index'
import Dashboard from './components/Dashboard/index'

import './App.css'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

function App() {
  let userCredentials
  if (localStorage.token) {
    userCredentials = { token: localStorage.token }
  } else {
    userCredentials = { token: '' }
  }

  const [user, setUser] = useState(userCredentials)

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Login setUser={setUser} {...props} />}
          />
          <Route path="/logout">
            <Redirect to="/" />
          </Route>
          <Route path="/dashboard">
            {user.token ? (
              <Dashboard user={user} setUser={setUser} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
