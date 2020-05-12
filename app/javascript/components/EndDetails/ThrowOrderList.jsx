import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ThrowOrderList = (props) => {
  const classes = useStyles();
  const [selectedPlayer, setSelectedPlayer] = useState();

  // const handleListItemClick = (event, index) => {
  //   setSelectedIndex(index);
  // };

  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <ListItemText primary="Throw Order"/>
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem selected={false}>
          <ListItemText primary="Vlad" />
        </ListItem>
        <ListItem selected={true}>
          <ListItemText primary="Santiago" />
        </ListItem>
      </List>
    </div>
  );
}

export default ThrowOrderList;