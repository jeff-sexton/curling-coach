import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '1000px',
    margin: 'auto',
  },

}));

const Example = (props) => {
  return (
    <div
      style={{

        borderColor: 'black',
        border: 2,
        borderStyle: 'solid',
        width: '100%',
      }}
    >{props.children}</div>
  );
};

const Tall = (props) => {
  return (
    <div
      style={{

        borderColor: 'black',
        border: 2,
        borderStyle: 'solid',
        height: '700px',
        maxWidth: '500px',
        minWidth: '500px'
      }}
    >{props.children}</div>
  );
};

const GameView = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Box display='flex' justifyContent='space-around'>
        <Tall>This has quite a lot of textThis has quite a lot of textThis has quite a lot of textThis has quite a lot of textThis has quite a lot of textThis has quite a lot of textThis has quite a lot of textThis has quite a lot of textThis has quite a lot of textThis has quite a lot of textThis has quite a lot of textThis has quite a lot of textThis has quite a lot of textThis has quite a lot of textThis has quite a lot of textThis has quite a lot of textThis has quite a lot of textThis has quite a lot of textThis has quite a lot of text</Tall>
        <Box display='flex' flexDirection='column' justifyContent='space-between' width='40%'>
          <Example>This has very little text </Example>
          <Example>This has very little text</Example>
          <Example>This has very little text</Example>
        </Box>

      </Box>
    </div>
  );
};

export default GameView;
