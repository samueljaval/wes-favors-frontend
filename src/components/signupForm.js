import React, { useState } from 'react'
import signupService from '../services/signup'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {
  Redirect,Link
} from "react-router-dom"


const SignUpForm = () => {

    const [name, setName] = useState('')
	const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [Class, setClass] = useState('')
	const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [done, setDone] = useState(null)   // when done is true, we redirect to login

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

	const handleSignup = async (event) => {
		event.preventDefault()
        if (password === confirmPassword) {
            const signResponse = await signupService.signup({name, email, password, Class, phone})
            console.log(signResponse)
            if (signResponse.status === 201) {
                // once sign up worked we redirect to login 
                setDone(true)
            }
            else {
                console.log(signResponse.data)
            }
        }
        else {
            console.log("passwords aren't similar")
        }
	}

    const form = {
        position: 'absolute',
        left: '50%',
        top: width/15 ,
        transform: 'translate(-50%, 0%)'
    }

    const title = {
        position: 'absolute',
        left: '50%',
        top: '6%',
        transform: 'translate(-50%, -50%)',
        color : 'darkred',
        fontSize: (height+width)/40
    }

	return (
        <div>
        {done ? <Redirect to = "/login"/> : <></>}
        <div style={title}>WES FAVORS </div>
        <div style={form}>
    		<form onSubmit={handleSignup}>
                <div>
                    <TextField
                                label="name"
                                value={name}
                                name="Name"
                                onChange={({ target }) => setName(target.value)}/>
                </div>
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
                <div>
                    <TextField
                                type="password"
                                label="confirm password"
                                value={confirmPassword}
                                name="Confirm Password"
                                onChange={({ target }) => setConfirmPassword(target.value)}/>
    			</div>
                <div>
                    <TextField
                                type="phone"
                                label="phone"
                                value={phone}
                                name="Phone"
                                onChange={({ target }) => setPhone(target.value)}/>
    			</div>
                <div>
                    <TextField
                                type="class"
                                label="class"
                                value={Class}
                                name="Class"
                                onChange={({ target }) => setClass(target.value)}/>
    			</div>
                <p></p>
                <Button type="submit" variant="outlined">sign up</Button>
                <p></p>
                <div> have an account? </div>
                <Link to='/login'>login here</Link>
    		</form>
        </div>
        </div>
	)
}

export default SignUpForm
