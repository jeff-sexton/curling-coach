import React, {useState, useEffect} from 'react';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

const filter = createFilterOptions();

export default function Asynchronous({teamId, setTeamId, teamList}) {
  const [dialogOpen, toggleDialogOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState({
    team_name: '',
    year: '',
  });
  
  const [value, setValue] = useState(null);

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

 useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await axios.get(`/api/teams`)

      if (active) {
        setOptions(response.data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleClose = () => {
    setDialogValue({
      team_name: '',
      year: '',
    });

    toggleDialogOpen(false);
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      team_name: dialogValue.team_name,
      year: parseInt(dialogValue.year, 10),
    });

    handleClose();
  };

  return (
    <>
    <Autocomplete
      id="asynchronous-demo"
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          // timeout to avoid instant validation of the dialog's form.
          setTimeout(() => {
            toggleDialogOpen(true);
            setDialogValue({
              team_name: newValue,
              year: '',
            });
          });
        } else if (newValue && newValue.inputValue) {
          toggleDialogOpen(true);
          setDialogValue({
            team_name: newValue.inputValue,
            year: '',
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            team_name: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}

      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.team_name === value.team_name}
      getOptionLabel={(option) => {
        // e.g value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.team_name;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      renderOption={(option) => option.team_name}
      options={options}
      loading={loading}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
     <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Add a new film</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any film in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="team_name"
              value={dialogValue.team_name}
              onChange={(event) => setDialogValue({ ...dialogValue, team_name: event.target.value })}
              label="Team Name"
              type="text"
            />
            <TextField
              margin="dense"
              id="name"
              value={dialogValue.year}
              onChange={(event) => setDialogValue({ ...dialogValue, year: event.target.value })}
              label="year"
              type="number"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="primary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>

    </>
  );
}