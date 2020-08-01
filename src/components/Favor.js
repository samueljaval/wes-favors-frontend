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

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 600,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));


const Favor = (props) => {
    const classes = useStyles();
    // const token = useSelector(store => store.user.token)
    // this hard coded token is just for testing
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Indlc2Zhdm9yc2FwcEBnbWFpbC5jb20iLCJpZCI6IjVmMjE2Y2Y0ODA2ODZhNmZlYzQ1ZTdkMSIsImlhdCI6MTU5NjAzNTAzOH0.xMcJ0Cxw38bgjmPzhtTS0qYGplhMCMZTWhEa50KKUT8"
    const favor = props.favor

    const accept = async () => {
        try {
            axios({
                      method: 'put', //you can set what request you want to be
                      url: "http://localhost:3001/api/favors/accept/" + favor.id,
                      headers: {
                        Authorization: 'bearer ' + token
                  }
                })
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
                Posted : {favor.posted_date_time} <br/>
                Price : {favor.price ? `${favor.price}$`  : "no price"} <br/>
                Expiration : {favor.expiration_date_time ? `${favor.expiration_date_time}`  : "no expiration time"}
              </Typography>
             <br/>
            <Button style={{color:"red"}} onClick={accept} variant="contained"
            size="small">I can do it</Button>
          </Paper>
          </div>
        );
}

export default Favor
