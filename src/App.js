import React from 'react'
import LoginForm from './components/loginForm'
import SignUpForm from './components/signupForm'
import {
  Switch,
  Route,
} from "react-router-dom"

const App = () => {
  return (
    <div>
    <Switch>
        <Route path = "/signup">
        <SignUpForm/>
        </Route>
        <Route path = "/login">
        <LoginForm/>
        </Route>
        <Route path = "/feed">
        <div>this page will be the feed</div>
        </Route>
        <Route path = "/">
        <div> go to /login or /signup in the url (development) </div>
        </Route>
    </Switch>
    </div>
  )
}

export default App
