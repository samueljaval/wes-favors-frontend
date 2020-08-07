import React ,{ useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import DoneIcon from '@material-ui/icons/Done';
import PostingForm from './postingForm'
import Hidden from '@material-ui/core/Hidden';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import IconButton from '@material-ui/core/IconButton';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SchoolIcon from '@material-ui/icons/School';
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Google from './googleLogin'
import PostAddIcon from '@material-ui/icons/PostAdd';
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
  avatar: {
    // margin: theme.spacing(1),
    color:"black",
    backgroundColor: "white",
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
  const [showing, setShowing] = useState(null)
  const [logged, setLogged] = useState(true)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

console.log(showing)
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
          <ListItem button onClick={()=>setShowing("post")} key={"Post Favor"}>
            <ListItemIcon><PostAddIcon /></ListItemIcon>
            <ListItemText primary={"Post a Favor"} />
          </ListItem>

      <Divider />

          <ListItem button onClick={()=>console.log("e")} key={"My Account"}>
            <ListItemIcon><AccountBoxIcon/></ListItemIcon>
            <ListItemText primary={"My Account"} />
          </ListItem>

      <Divider />

          <ListItem button onClick={()=>setShowing(null)} key={"All Categories"}>
            <ListItemIcon><ListAltIcon /></ListItemIcon>
            <ListItemText primary={"All Categories"} />
          </ListItem>


          <ListItem button onClick={()=>setShowing("Rides")} key={"Rides"}>
            <ListItemIcon><DriveEtaIcon /></ListItemIcon>
            <ListItemText primary={"Rides"} />
          </ListItem>

          <ListItem button onClick={()=>setShowing("Academics")} key={"Academics"}>
            <ListItemIcon><SchoolIcon /></ListItemIcon>
            <ListItemText primary={"Academics"} />
          </ListItem>

          <ListItem button onClick={()=>setShowing("Errands")} key={"Errands"}>
            <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
            <ListItemText primary={"Errands"} />
          </ListItem>

          <ListItem button onClick={()=>setShowing("COVID Related")} key={"COVID Related"}>
            <ListItemIcon><AccessibilityIcon /></ListItemIcon>
            <ListItemText primary={"COVID Related"} />
          </ListItem>

          <ListItem button onClick={()=>setShowing("Random")} key={"Random"}>
            <ListItemIcon><PanoramaFishEyeIcon/></ListItemIcon>
            <ListItemText primary={"Random"} />
          </ListItem>

          <Divider />

          <ListItem button onClick={()=>setShowing("Completed")} key={"Completed"}>
            <ListItemIcon><DoneIcon/></ListItemIcon>
            <ListItemText primary={"Completed Favors"} />
          </ListItem>

          <Divider />

          <ListItem button onClick={()=>setShowing('help')} key={"Help/About"}>
            <ListItemIcon><HelpOutlineIcon/></ListItemIcon>
            <ListItemText primary={"Help/About"} />
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
          <Typography style={{fontWeight: 'bold', flex:1 }} variant="h4" noWrap>
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
        {logged ? (showing === 'post' ? <PostingForm setShowing={setShowing}/> : <Feed category={showing}/>)
                : <Google/> }
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
