import React, { useState } from 'react'
import signupService from '../services/signup'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import Container from '@material-ui/core/Container'
import { Alert, AlertTitle } from '@material-ui/lab'
import {
  Redirect,Link
} from "react-router-dom"


const SignUpForm = () => {



    const [name, setName] = useState('')
	const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [Class, setClass] = useState('')
    const [msg, setMsg] = useState(null)
	const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [done, setDone] = useState(null)   // when done is true, we redirect to login

    // screen data for making responsive
    // const [width, setWidth] = React.useState(window.innerWidth)
    // const [height, setHeight] = React.useState(window.innerHeight)
    // const updateWidthAndHeight = () => {
    //   setWidth(window.innerWidth);
    //   setHeight(window.innerHeight);
    // }
    // React.useEffect(() => {
    //     window.addEventListener("resize", updateWidthAndHeight);
    //     return () => window.removeEventListener("resize", updateWidthAndHeight);
    // })


    const useStyles = makeStyles((theme) => ({
      paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }))

    const classes = useStyles()


	const handleSignup = async (event) => {
		event.preventDefault()
        if (password === confirmPassword) {
            const signResponse = await signupService.signup({name, email, password, Class, phone})
            if (signResponse.status === 201) {
                // once sign up worked we redirect to login
                setDone(true)
            }
            if (signResponse.status === 500) {          // all the other database validation errors are checked for in backend
                setMsg("An account with this email has already been created")
            }
            else {
                console.log(signResponse.data)
                setMsg(signResponse.data.error)
            }
        }
        else {
            setMsg("passwords aren't similar")
        }
	}
    return (
        <div>
        {done ? <Redirect to = "/login"/> : <></>}
        {msg ?  <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>{msg}</strong>
        </Alert> : <></>}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <AssignmentIndIcon/>
            </Avatar>
            <Typography component="h1" variant="h4">
              WesFavors - Sign Up
            </Typography>
            <form onSubmit={handleSignup} className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={({ target }) => setName(target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email"
                id="email"
                onChange={({ target }) => setEmail(target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                onChange={({ target }) => setPassword(target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Confirm Password"
                type="password"
                id="cpassword"
                onChange={({ target }) => setConfirmPassword(target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Class"
                id="Class"
                onChange={({ target }) => setClass(target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone Number"
                id="phone"
                onChange={({ target }) => setPhone(target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login">
                    {"Already have an account? Log in"}
                  </Link>
                </Grid>
              </Grid>
            </form>
            <br></br><br></br><br></br><br></br>
          </div>
        </Container>
        </div>
    )
}

export default SignUpForm
