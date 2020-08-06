import React from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import AppBar from '@material-ui/core/AppBar';
import axios from 'axios'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import SendIcon from '@material-ui/icons/Send';
import ForumIcon from '@material-ui/icons/Forum';
import Container from '@material-ui/core/Container'
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import DoneIcon from '@material-ui/icons/Done';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';



const CLIENT_ID = '626183638213-kr4tf348snk6v6sjm8bdl562hel7kfcd.apps.googleusercontent.com'

const Google = () => {

    const useStyles = makeStyles((theme) => ({
      paper: {
        marginTop: theme.spacing(13),
        display: 'flex',
        marginLeft : 10,
        marginRight: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
    }))

    const classes = useStyles()

    const responseGoogle = (response) => {
      console.log(response)
      axios
        .post("http://localhost:3001/api/googleLogin"
                , {tokenId : response.tokenId})
        .then(response => console.log(response))
    }

    return (
        <div>
        <AppBar style={{ backgroundColor: 'darkred' }} position="fixed" className={classes.appBar}>
          <Toolbar>
          <Typography style={{fontWeight: 'bold', flex:1 }} variant="h4" noWrap>
               WESFAVORS
          </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.paper}>
        <Typography>
            Please sign in with your wesleyan.edu google account to enter the site.
        </Typography>
        <br/>
        <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        <br/><br/><br/>
        <Typography>
             here's how it works
        </Typography>
        <List className={classes.root}>
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
      </div>
  )
}

export default Google
