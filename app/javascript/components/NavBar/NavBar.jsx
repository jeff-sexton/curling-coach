import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';

import Logo from '../../assets/logo_white.svg';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
// import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
    fontFamily: "'Roboto Slab', 'serif'",
    color: theme.palette.text.titles
  },
  logo: {
    width: 'auto',
    padding: 2,
    maxWidth: 65,
    marginRight: 10,
    cursor: 'pointer',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  navBar: {
    color: theme.palette.text.secondary,
  },
  listItemText: {
    cursor: 'pointer',
  },
}));

const NavBar = ({ handleHome }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <ListItemIcon onClick={handleHome}>
            <HomeIcon cursor="pointer" />
          </ListItemIcon>
          <ListItemText
            onClick={handleHome}
            classes={{ root: classes.listItemText }}
            variant="body1"
          >
            Home
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon onClick={handleHome}>
            <CreateNewFolderIcon cursor="pointer" />
          </ListItemIcon>
          <ListItemText
            onClick={handleHome}
            classes={{ root: classes.listItemText }}
            variant="body1"
          >
            New Game
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <React.Fragment key={'right'}>
        <AppBar position="static" classes={{ root: classes.navBar }}>
          <Toolbar>
            <CardMedia
              edge="start"
              image={Logo}
              component="img"
              classes={{ img: classes.logo }}
              onClick={handleHome}
            />
            <Typography
              variant="h6"
              className={classes.title}
              onClick={handleHome}
            >
              Curling Coach
            </Typography>
            <IconButton
              onClick={toggleDrawer('right', true)}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor={'right'}
              open={state['right']}
              onClose={toggleDrawer('right', false)}
            >
              {list('right')}
            </Drawer>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </div>
  );
};

export default NavBar;
