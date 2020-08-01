import React ,{ useState }from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import PostingForm from './postingForm'
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Feed from './feed'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
      zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showing, setShowing] = useState('all')

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
          <ListItem button onClick={()=>setShowing('post')} key={"Post Favor"}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={"Post Favor"} />
          </ListItem>

      <Divider />

          <ListItem button onClick={()=>console.log("e")} key={"My Account"}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={"My Account"} />
          </ListItem>

      <Divider />

          <ListItem button onClick={()=>setShowing('all')} key={"All Categories"}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={"All Categories"} />
          </ListItem>


          <ListItem button onClick={()=>console.log("e")} key={"Rides"}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={"Rides"} />
          </ListItem>

          <ListItem button onClick={()=>console.log("e")} key={"Academics"}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={"Academics"} />
          </ListItem>

          <ListItem button onClick={()=>console.log("e")} key={"Errands"}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={"Errands"} />
          </ListItem>

          <ListItem button onClick={()=>console.log("e")} key={"COVID Related"}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={"COVID Related"} />
          </ListItem>
      </List>
      </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar style={{ backgroundColor: 'darkred' }} position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
               WESFAVORS
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {showing === 'all' ? <Feed/> : <></>}
        {showing === 'post' ? <PostingForm/> : <></>}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
