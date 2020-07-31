import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Favor = (props) => {
    const classes = useStyles();
    // const user = useSelector(store => store.user.token)
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
          <Card className={classes.root} variant="outlined">
            <CardContent>
            <Typography variant="h6" component="h6">
              Title : {favor.title}
            </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Details : {favor.details}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Posted : {favor.posted_date_time}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Price : {favor.price ? `${favor.price}$`  : "no price"}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={accept} variant="contained"
              size="small">I will do it!</Button>
            </CardActions>
          </Card>
        );
}

export default Favor
