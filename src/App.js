import React from 'react'
import LoginForm from './components/loginForm'
import SignUpForm from './components/signupForm'
import Feed from './components/feed'
import PostingForm from './components/postingForm'
import Drawer from './components/Drawer'
import Google from './components/googleLogin'
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
        <Route path = "/main">
        <Drawer/>
        </Route>
        <Route path = "/posting">
        <PostingForm/>
        </Route>
        <Route path = "/">
        <Google/>
        </Route>
    </Switch>
    </div>
  )
}

export default App
