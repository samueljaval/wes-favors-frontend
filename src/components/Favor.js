import React from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 600,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const Favor = (props) => {
    const classes = useStyles();
    // const token = useSelector(store => store.user.token)
    // this hard coded token is just for testing
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Indlc2Zhdm9yc2FwcEBnbWFpbC5jb20iLCJpZCI6IjVmMjE2Y2Y0ODA2ODZhNmZlYzQ1ZTdkMSIsImlhdCI6MTU5NjAzNTAzOH0.xMcJ0Cxw38bgjmPzhtTS0qYGplhMCMZTWhEa50KKUT8"
    const favor = props.favor
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const accept = async () => {
        setOpen(false)
        try {
            axios({
                      method: 'put', //you can set what request you want to be
                      url: "http://localhost:3001/api/favors/accept/" + favor.id,
                      headers: {
                        Authorization: 'bearer ' + token
                  }
                })
            console.log("accepted")
            if (favor.accepted) {console.log("you are not the first to accept this favor")}
        }
        catch (error) {console.log(error.response)}
    }
        return (
            <div>
          <Paper className={classes.paper}>
              <Typography variant="h6" component="h6">
              {favor.title}
            </Typography>
              <Typography variant="body2" className={classes.pos} color="textSecondary">
                Details : {favor.details} <br/>
                {favor.price ? `Offer : ${favor.price}$` : <></>}
                {favor.price ? <br/> : <></>}
                Posted : {favor.posted_date_time} <br/>
                {favor.expiration_date_time ? `Expiration : ${favor.expiration_date_time}`  : <></>}
              </Typography>
             <br/>
            {props.showButton ? <Button style={{color:"red"}} onClick={handleClickOpen} variant="contained"
            size="small">I can do it</Button> : <></>}
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
