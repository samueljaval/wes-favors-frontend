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

	const [email, setEmail] = useState('')
    const [token, setToken] = useState('')          // email verification token
	const [password, setPassword] = useState('')
    const [done, setDone] = useState(null)           // when done is true, we redirect to the feed, user logged in
    const [verify, setVerify] = useState(false)      // when verify is true, we ask for the confirmation token

    // screen data for making responsive
    const [width, setWidth] = React.useState(window.innerWidth)
    const [height, setHeight] = React.useState(window.innerHeight)
    const updateWidthAndHeight = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    React.useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    })


	const handleLogin = async (event) => {
		event.preventDefault()
		const response = await loginService.login({ email, password })
        // need to find a way to keep user logged in here, maybe user cookies
        // what the course did was not good practice and apparently not safe
        if (response.status === 200) {
            setEmail('')
			setPassword('')
			dispatch(login(response.data.email, response.data.name, response.data.token))
            setDone(true)
        }
        if (response.data.error === "account not verified") {
            setVerify(true)
        }
	}

    const handleToken = async (event) => {
        event.preventDefault()
        const response = await loginService.verify({token, email})
        if (response.status === 200) {setDone(true)}
        if (response.data.type === 'not-verified') {console.log(response.data.msg)}
    }

    const resendToken = async () => {
        const resend = await loginService.resend(email)
        console.log(resend.data)
    }

    const center = {
        position: 'absolute',
        left: '50%',
        top: '40%',
        transform: 'translate(-50%, -50%)'
    }
    const down = {
        position: 'absolute',
        left: '50%',
        top: '70%',
        transform: 'translate(-50%, -50%)'
    }
    const title = {
        position: 'absolute',
        left: '50%',
        top: '6%',
        fontSize: (height+width)/40,
        transform: 'translate(-50%, -50%)',
        color : 'darkred'
    }

	return (
        <div>
        {done ? <Redirect to = "/feed"/> : <></>}
        <div style={title}>WES FAVORS</div>
        {verify ? <div style = {center}>
            <form onSubmit={handleToken}>
            <div> We have sent you an email with a verification token. </div> <div>Check your SPAM</div>
                        <div>
                            <TextField
                                label="verification token"
                                value={token}
                                name="token"
                                onChange={({ target }) => setToken(target.value)}/>
                        </div>
                        <p></p>
                        <Button type="submit" variant="outlined">verify token</Button>
                        <p></p>
                    </form>
                    <button onClick={resendToken}>Resend Token to {email}</button>
                    </div>
                :
                <form style={center} onSubmit={handleLogin}>
        			<div>
                        <TextField
                                    label="email"
                                    value={email}
                                    name="email"
                                    onChange={({ target }) => setEmail(target.value)}/>
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
        		</form>}
        <div style={down}>
        <div> no account yet? </div>
        <Link to='/signup'>sign up here</Link>
        </div>
        </div>
	)
}

export default LoginForm
