import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '56%',
    left: '59%',
    transform: 'translate(-56%, -59%)', 
  },
}));

const EndModal = ({ gameState, startEnd }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const { currentEnd } = gameState;

  useEffect(() => {
    // console.log(gameState);
    if (
      gameState.ends[gameState.currentEnd] &&
      !gameState.ends[gameState.currentEnd].end.first_team_id
    ) {
      handleOpen();
    }
  }, [currentEnd]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSave = () => {
    startEnd(1);
    
    handleClose()

  };

  const body = (
    <div className={classes.paper}>
      <h2 id="setup-end">Select First Team for end: {currentEnd + 1}</h2>
      <p id="setup-end-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <button
        onClick={() => {
          onSave()
        }}
      >
        Set Order
      </button>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="setup-end"
        aria-describedby="setup-end-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default EndModal;
