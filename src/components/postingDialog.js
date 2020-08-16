import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Notif from './Notif'
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


export default function FormDialog({setPosting, setShowing}) {
  const [open, setOpen] = React.useState(true)
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

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setPosting(false)
    setOpen(false);
  };

  const handleDateChange = (date) => {
      if (exp) setExpires(date)
  }

  const handlePosting = async (event) => {
      event.preventDefault()
      const response = await postingService.posting({ title,
              details,
              location,
              category,
              price : goodPrice(price),
              expiration_date_time : expires})
      if (response.status === 201) {
          setPosting(false)
          setOpen(false)
          window.location.reload(false);
      }
      else {setMsg(response.data.error)}
  }

  const goodPrice = (price) => {
      if (price) return price.split(",").join("")
      else return null
  }


  return (
    <div>
    {msg ?  <Notif setMessage = {setMsg} message={msg} severity="error"/> : <></>}
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="form-dialog-title">Posting A Favor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            When a student accepts your favor, you will recieve a text message with their phone number
          </DialogContentText>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="title"
            label="Title"
            autoFocus
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            variant="outlined"
            margin="dense"
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
              control={<Checkbox checked={cat} onChange={()=>setCat(!cat)} color="primary"/>}
              label="add a category (default = Random)"
              />
            { cat ? <FormControl variant="outlined">
                  <InputLabel>Category</InputLabel>
                  <Select value={category} onChange={({ target }) => setCategory(target.value)} label="Random">
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
              control={<Checkbox checked={free} onChange={()=>setFree(!free)} color="primary"/>}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePosting} color="primary">
            SUBMIT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
