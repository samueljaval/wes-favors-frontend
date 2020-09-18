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
import ListAltIcon from '@material-ui/icons/ListAlt';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { logout } from '../reducers/userReducer';
import { useDispatch } from 'react-redux';
import Google from './googleLogin';
import { Redirect} from "react-router-dom"


const MyAccount = () => {
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
    bottom: {
        marginBottom: theme.spacing(3),
    }
    }))
    const [loggedIn, setLoggedIn] = React.useState(true);

    const classes = useStyles()

    const handleLogout = () => {
        setLoggedIn(false)
        window.localStorage.removeItem('userToken')
    }

    if (!loggedIn) {
        return (
            <div>
            <Redirect to = "/"/>
            </div>
        )
    }

    return (
        <div>
            <List className={classes.paper}>
                <ListItem className={classes.bottom}>
                    <ListItemAvatar>
                      <Avatar style={{backgroundColor:'darkred'}}>
                        <ListAltIcon/>
                      </Avatar>
                    </ListItemAvatar>
                        <Typography component="h2" variant="h6">
                          MY ACCOUNT
                        </Typography>
                </ListItem>
        </List>
        <Button className={classes.root} variant="contained" onClick={handleLogout}> Logout </Button>
        {/* <Button variant="contained" color="secondary">
      Secondary
    </Button> */}
        </div>
    )

}

export default MyAccount
