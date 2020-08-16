import React from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CategoryIcon from '@material-ui/icons/Category';
import TimerIcon from '@material-ui/icons/Timer';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import GetAppIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 600,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function timeToGo(date) {
    const d = new Date(date)
    var diff = d - new Date();
    diff = Math.abs(diff);
    var hours = diff/3.6e6 | 0;
    // var mins  = diff%3.6e6 / 6e4 | 0;
    // var secs  = Math.round(diff%6e4 / 1e3);
    if (Number((hours)) > 24) return Math.round(Number((hours))/24) + ' days'
    return  (hours) + ' hours'
}


const Favor = (props) => {
    const classes = useStyles();
    // const token = useSelector(store => store.user.token)
    // this hard coded token is just for testing
    const token = process.env.REACT_APP_TOKEN
    const favor = props.favor
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const accept = async () => {
        setOpen(false)
        try {
            const reponse = await axios({
                      method: 'put', //you can set what request you want to be
                      url: "http://localhost:3001/api/favors/accept/" + favor.id,
                      headers: {
                        Authorization: 'bearer ' + token
                  }
            })
            if (reponse) {
                props.setFavors(props.favors.filter(f => f.id != favor.id))
                props.setMsg({msg : "favor successfully accepted", severity : "success"})
            }
            else props.setMsg({msg : "we had a problem while accepting the favor", severity : "error"})
        }
        catch (error) {console.log(error.response)}
    }

    const getNiceDate = (posted_date) => {
        const posted = new Date(favor.posted_date_time)
        return `${posted.getMonth()}/${posted.getDate()} at ${posted.getHours()}:${posted.getMinutes()}`
    }

        return (
            <div>
          <Paper className={classes.paper}>
          <Grid container><Grid item><Chip icon={<CategoryIcon/>}  size="small" label={favor.category}/></Grid>
          <Grid item><Chip icon={<GetAppIcon/>} size="small" label={<div>{getNiceDate(favor.posted_date_time)}<br/></div>}/></Grid>
          {favor.expiration_date_time ? <Grid item><Chip icon={<TimerIcon/>} size="small" label={<div>{timeToGo(favor.expiration_date_time)}<br/></div>}/></Grid> : <></>}</Grid>
              <Typography variant="h6" component="h6">
                          {favor.title}
                          </Typography>
              <Typography variant="body2" className={classes.pos} color="textSecondary">
                Details : {favor.details}
              </Typography>
             <br/>
             <Grid container spacing = {2}>
             <Grid item>
            {!favor.accepted ? <Button style={{color:"red"}} onClick={handleClickOpen} variant="contained"
            size="small">I can do it</Button> : <></>}
            </Grid>
            <Grid item>
            {favor.price ? <Chip label={<div style={{fontWeight:'bold'}}>Offer : ${favor.price}</div>}/> : <></>}
            </Grid>
            </Grid>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">{"Accepting a favor"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    If you click "sounds good", the requester will receive a text message from us
                    containing your phone number inviting them to contact you. <br/>WesFavors thanks you for helping a fellow student :)
                    <br/><br/>Please do not continue if you are not planning on completing the favor! If you do so, no one else will be able to see the post and help the student
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                  <Button onClick={accept} color="primary">
                    Sounds Good
                  </Button>
                </DialogActions>
              </Dialog>
          </Paper>
          </div>
        );
}

export default Favor
