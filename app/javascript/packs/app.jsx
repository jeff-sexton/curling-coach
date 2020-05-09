import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import PropTypes from "prop-types";
import axios from "axios";

import IceSurface from "./components/IceSurface";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));



function App() {
  const classes = useStyles();

  const [shot, setShot] = useState(0);

  const nextShot = () => {
    setShot((prev) => prev + 1);
  };
  const prevShot = () => {
    setShot((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  return (
    <div className="App">
      <IceSurface shot={shot}></IceSurface>
      <h1>Shot number: {shot}</h1>
      <button onClick={nextShot}>Next</button>
      <button onClick={prevShot}>Prev</button>
      <div className={classes.root}>
        <Button variant="contained">Default</Button>
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
      </div>
    </div>
  );
}

export default App;
