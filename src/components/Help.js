import React from 'react'
import SendIcon from '@material-ui/icons/Send';
import ForumIcon from '@material-ui/icons/Forum';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ListAltIcon from '@material-ui/icons/ListAlt';

const Help = () => {
    const useStyles = makeStyles((theme) => ({
      paper: {
        display: 'flex',
        marginLeft : 10,
        marginRight: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    root: {
    width: '100%',
    maxWidth: 360,
    marginLeft: 20
  },
  avatar: {
    backgroundColor: "darkred",
},
bottom: {
    marginBottom: theme.spacing(3),
}
    }))

    const classes = useStyles()

    return (
        <div>
            <List className={classes.paper}>
                <ListItem className={classes.bottom}>
                    <Grid container spacing={1}>
                        <Grid item>
                        <Avatar className={classes.avatar}><ListAltIcon/></Avatar>
                        </Grid>
                        <Grid item>
                        <Typography component="h2" variant="h6">
                          HELP/ABOUT
                        </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
            <ListItem>
              <ListItemText primary="We hope you're enjoying WesFavors, an app created to allow Wesleyan students to post and accept favors from other students."/>
            </ListItem>
            <ListItem>
              <ListItemText className={classes.bottom} primary="A summary of how it works is below, but if you have any questions/comments just send us an email at wesfavorsapp@gmail.com!"/>
            </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar style={{backgroundColor:'darkred'}}>
                <SendIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="1. Post a favor"/>
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemAvatar>
              <Avatar style={{backgroundColor:'darkred'}}>
                <DoneIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="2. A Wesleyan student accepts it " />
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemAvatar>
              <Avatar style={{backgroundColor:'darkred'}}>
                <PhoneIphoneIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="3. You receive a text with the accepter's number" />
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemAvatar>
              <Avatar style={{backgroundColor:'darkred'}}>
                <ForumIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="4. Text/Call the acceptor to get the help you need!" />
          </ListItem>
        </List>
        </div>
    )
}

export default Help
