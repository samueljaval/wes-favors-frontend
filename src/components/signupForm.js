import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import signupService from '../services/signup'
import {login} from '../reducers/userReducer'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {
  Redirect,Link
} from "react-router-dom"

const SignUpForm = () => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [done, setDone] = useState(null)

	const handleSignup = async (event) => {
		event.preventDefault()
		try {
            if (password === confirmPassword) {
                await signupService.signup({name, username, password})
    			const user = await loginService.login({ username, password })
                // not a good way of staying logged in
    			// window.localStorage.setItem(
    			// 	'loggedUser', JSON.stringify(user)
    			// )
    			setUsername('')
    			setPassword('')
                setName('')
    			dispatch(login(user.username, user.name, user.token))
                setDone(true)
            }
            else {
                console.log("incorrect passwords")
            }
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
		<form style={center} onSubmit={handleSignup}>
            <div>
                <TextField
                            label="name"
                            value={name}
                            name="Name"
                            onChange={({ target }) => setName(target.value)}/>
            </div>
			<div>
                <TextField
                            label="username"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}/>
			</div>
            <p></p>
            <div>your password needs to be a least 8 characters long</div>
            <div>with a least an upper case, a lower case and a number</div>
			<div>
                <TextField
                            type="password"
                            label="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}/>
			</div>
            <div>
                <TextField
                            type="password"
                            label="confirm password"
                            value={confirmPassword}
                            name="Confirm Password"
                            onChange={({ target }) => setConfirmPassword(target.value)}/>
			</div>
            <p></p>
            <Button type="submit" variant="outlined">sign up</Button>
		</form>
        <div style={down}>
        <div> have an account? </div>
        <Link to='/login'>login here</Link>
        </div>

        </div>
	)
}

export default SignUpForm
