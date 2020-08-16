import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import PostAddIcon from '@material-ui/icons/PostAdd';
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Notif from './Notif'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DateFnsUtils from '@date-io/date-fns';
import postingService from '../services/posting'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Checkbox from '@material-ui/core/Checkbox';


const Posting = (props) => {

    const [title, setTitle] = useState(null)
    const [details, setDetails] = useState(null)
    const [price, setPrice] = useState(null)
    const [expires, setExpires] = useState(null)
    const [location, setLocation] = useState(null)
    const [category, setCategory] = useState("Random")
    const [msg, setMsg] = useState(null)
    const [exp, setExp] = useState(false)
    const [free, setFree] = useState(false)
    const [loc, setLoc] = useState(false)
    const [cat, setCat] = useState(false)

    const useStyles = makeStyles((theme) => ({
      paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      formControl: {
          marginTop: theme.spacing(2),
          marginBottom:theme.spacing(1),
          margin: theme.spacing(0),
          width: '97%'
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

    const goodPrice = (price) => {
        if (price) return price.split(",").join("")
        else return null
    }


    const handlePosting = async (event) => {
        event.preventDefault()
        const response = await postingService.posting({ title,
                details,
                location,
                category,
                price : goodPrice(price),
                expiration_date_time : expires})
        // need to find a way to keep user logged in here, maybe user cookies
        // what the course did was not good practice and apparently not safe
        if (response.status === 201) {
            props.setShowing(null)
        }
        else {setMsg(response.data.error)}
    }

    const classes = useStyles()
    return (
        <div>
        {msg ?  <Notif setMessage = {setMsg} message={msg} severity="error"/> : <></>}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}><PostAddIcon/></Avatar>
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
                rows={2}
                required
                fullWidth
                label="Details"
                id="details"
                onChange={({ target }) => setDetails(target.value)}
              />
              <FormControlLabel
                  control={
                    <Checkbox
                      checked={cat}
                      onChange={()=>setCat(!cat)}
                      color="primary"
                    />
                  }
                  label="add a category (default = Random)"
                  />
                { cat ? <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={category}
                        onChange={({ target }) => setCategory(target.value)}
                        label="Random"
                      >
                        <MenuItem value="Random">
                          <em>Random</em>
                        </MenuItem>
                        <MenuItem value={"Rides"}>Rides</MenuItem>
                        <MenuItem value={"Academics"}>Academics</MenuItem>
                        <MenuItem value={"Errands"}>Errands</MenuItem>
                        <MenuItem value={"COVID Related"}>COVID Related</MenuItem>
                      </Select>
                </FormControl>
                : <></>}
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
                  {free ? <CurrencyTextField
                        label="Amount"
                        variant='outlined'
                        currencySymbol="$"
                        minimumValue="0"
                        outputFormat="number"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        onChange={({ target }) => setPrice(target.value)}
                    /> : <></>}
              <FormControlLabel
                  control={
                    <Checkbox
                      checked={loc}
                      onChange={()=>setLoc(!loc)}
                      color="primary"
                    />
                  }
                  label="add a location (not required)"
                  />
              {loc ? <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Location (not required)"
                id="location"
                onChange={({ target }) => setLocation(target.value)}
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
            <br></br>
          </div>
        </Container>
        </div>
    )
}

export default Posting
