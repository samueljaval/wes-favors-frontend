import React, { useState } from 'react'
import signupService from '../services/signup'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import PostAddIcon from '@material-ui/icons/PostAdd';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import Container from '@material-ui/core/Container'
import { Alert, AlertTitle } from '@material-ui/lab'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slide from '@material-ui/core/Slide';
import DateFnsUtils from '@date-io/date-fns';
import postingService from '../services/posting'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Checkbox from '@material-ui/core/Checkbox';
import {
  Redirect,Link
} from "react-router-dom"



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Posting = (props) => {

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState(null)
    const [details, setDetails] = useState(null)
    const [price, setPrice] = useState(null)
    const [expires, setExpires] = useState(null)
    const [location, setLocation] = useState(null)
    const [msg, setMsg] = useState(null)
    const [exp, setExp] = useState(false)
    const [free, setFree] = useState(false)

    const useStyles = makeStyles((theme) => ({
      paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: "darkred",
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }))

    const handleDateChange = (date) => {
        if (exp) setExpires(date)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

  const handleClose = () => {
      setOpen(false);
    };

    const handlePosting = async (event) => {
        event.preventDefault()

        const response = await postingService.posting({ title,
                details,
                location,
                price,
                expiration_date_time : expires})
        // need to find a way to keep user logged in here, maybe user cookies
        // what the course did was not good practice and apparently not safe
        if (response.status === 201) {
            props.setShowing('all')
        }
        else {setMsg(response.data.error)}
    }

    const classes = useStyles()
    return (
        <div>
        {msg ?  <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>{msg}</strong>
        </Alert> : <></>}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>W</Avatar>
            <Typography component="h1" variant="h4">
              Posting a Favor
            </Typography>
            <form onSubmit={handlePosting} className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                onChange={({ target }) => setTitle(target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                label="Multiline"
                multiline
                rows={3}
                required
                fullWidth
                label="Details"
                id="details"
                onChange={({ target }) => setDetails(target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Location (not required)"
                id="location"
                onChange={({ target }) => setLocation(target.value)}
              />
              <FormControlLabel
                  control={
                    <Checkbox
                      checked={free}
                      onChange={()=>setFree(!free)}
                      color="primary"
                    />
                  }
                  label="add how much you can pay (not required)"
                  />
              {free ? <TextField
                variant="outlined"
                margin="normal"
                label="Price"
                id="price"
                onChange={({ target }) => setPrice(target.value)}
              /> : <></>}
              <FormControlLabel
                  control={
                    <Checkbox
                      checked={exp}
                      onChange={()=>setExp(!exp)}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="add expiration Date/Time (not required)"
                  />
              {exp ? <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <Grid item xs>
                  <KeyboardDatePicker
                    margin="normal"
                    id="expiration date"
                    label="Expiration Date"
                    format="MM/dd/yyyy"
                    value={expires}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  </Grid>
                  <Grid item xs>
                  <KeyboardTimePicker
                    margin="normal"
                    id="expiration time"
                    label="Expiration Time"
                    value={expires}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider> : <></>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Post Favor
              </Button>
            </form>
            <br></br><br></br><br></br><br></br>
          </div>
        </Container>
        </div>
    )
}

export default Posting
