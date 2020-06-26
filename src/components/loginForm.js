import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import { login } from '../reducers/userReducer'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {
  Redirect, Link
} from "react-router-dom"

const LoginForm = () => {
    const dispatch = useDispatch()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
    const [done, setDone] = useState(null)

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username, password })
            // not a good way of staying logged in
			// window.localStorage.setItem(
			// 	'loggedUser', JSON.stringify(user)
			// )
			setUsername('')
			setPassword('')
			dispatch(login(user.username, user.name, user.token))
            setDone(true)
		}
		catch(exception) {
			console.log("login failed")
		}
	}

    const center = {
        position: 'absolute',
        left: '50%',
        top: '40%',
        transform: 'translate(-50%, -50%)'
    }

    const up = {
        position: 'absolute',
        left: '50%',
        top: '6%',
        transform: 'translate(-50%, -50%)',
        color : "darkred"
    }
    const down = {
        position: 'absolute',
        left: '50%',
        top: '70%',
        transform: 'translate(-50%, -50%)'
    }

	return (
        <div>
        {done ? <Redirect to = "/feed"/> : <></>}
        <h1 style={up}>WES FAVORS</h1>
		<form style={center} onSubmit={handleLogin}>
			<div>
                <TextField
                            label="username"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}/>
			</div>
			<div>
                <TextField  
                            type="password"
                            label="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}/>
			</div>
            <p></p>
            <Button type="submit" variant="outlined">login</Button>
		</form>
        <div style={down}>
        <div> no account yet? </div>
        <Link to='/signup'>sign up here</Link>
        </div>

        </div>
	)
}

export default LoginForm
