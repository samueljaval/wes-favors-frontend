import React from 'react'
import Drawer from './components/Drawer'
import Google from './components/googleLogin'
import { Offline } from "react-detect-offline";
import Notif from './components/Notif'
import {
  Switch,
  Route,
} from "react-router-dom"

const App = () => {
  return (
    <div>
    <Offline><Notif message={"check your internet connection"} setMessage={null} severity={"error"}/></Offline>
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
