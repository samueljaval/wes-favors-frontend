import React , { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import Container from '@material-ui/core/Container'
import { withStyles } from "@material-ui/core/styles"
import { useDispatch, useSelector } from 'react-redux'
import { Alert, AlertTitle } from '@material-ui/lab'
import loginService from '../services/login'
import { login } from '../reducers/userReducer'
import {
  Redirect,Link
} from "react-router-dom"


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

const LoginForm = () => {
  const classes = useStyles()

  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')          // email verification token
  const [done, setDone] = useState(null)           // when done is true, we redirect to the feed, user logged in
  const [verify, setVerify] = useState(false)      // when verify is true, we ask for the confirmation token
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
      event.preventDefault()
      const response = await loginService.login({ email, password })
      // need to find a way to keep user logged in here, maybe user cookies
      // what the course did was not good practice and apparently not safe
      if (response.status === 200) {
          dispatch(login(response.data.email, response.data.name, response.data.token))
          setDone(true)
      }
      if (response.data.error === "account not verified") {
          dispatch(login(response.data.email))
          setVerify(true)
      }
      if (response.status !== 200) {setMsg(response.data.error)}
  }

  const handleToken = async (event) => {
      event.preventDefault()
      let Email = ""
	  // allowing to omit the @wesleyan.edu of the email at login
	  email.includes("@wesleyan.edu") ? Email = email
										 : Email = email + "@wesleyan.edu"
      const response = await loginService.verify({token, Email})
      if (response.status === 200) {setDone(true)}
      if (response.data.type === 'not-verified') {console.log(response.data.msg);setMsg(response.data.msg)}
  }

  const resend = async () => {
      let sendEmail = ""
	  // allowing to omit the @wesleyan.edu of the email at login
	  email.includes("@wesleyan.edu") ? sendEmail = email
										 : sendEmail = email + "@wesleyan.edu"
      const response = await loginService.resend(sendEmail)
  }

  return (
      <div>
      {done ? <Redirect to = "/feed"/> : <></>}
      {msg ?  <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        <strong>{msg}</strong>
      </Alert> : <></>}
      {verify ?
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
              <VerifiedUserIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                Verify your confirmation token
              </Typography>
              <form onSubmit={handleToken} className={classes.form} noValidate>
                <TextField variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="enter your token"
                  id="token"
                  autoFocus
                  onChange={({ target }) => setToken(target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Verify Token
                </Button>
              </form>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick = {resend}
              >
                Send Another token
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick = {()=>setVerify(!verify)}
              >
                Go Back
              </Button>
            </div>
          </Container>
           :
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h4">
                WesFavors - Log in
              </Typography>
              <form onSubmit={handleLogin} className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email (you can omit the @wesleyan.edu)"
                  autoComplete="email"
                  autoFocus
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
                  autoComplete="current-password"
                  onChange={({ target }) => setPassword(target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to='#'>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/signup">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
      }
    </div>
  )
}

export default LoginForm
