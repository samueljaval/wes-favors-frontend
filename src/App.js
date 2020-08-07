import React from 'react'
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
        <Route path = "/main">
        <Drawer/>
        </Route>
        <Route path = "/">
        <Google/>
        </Route>
    </Switch>
    </div>
  )
}

export default App
