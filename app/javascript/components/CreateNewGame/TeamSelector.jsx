import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const TeamSelector = ({teamNumber, teamId, setTeamId, teamList }) => {
  const classes = useStyles();

  const menuOptions = teamList.map((team) => {
    return (
      <option key={team.id} value={team.id}>
        {team.team_name}
      </option>
    );
  });

  return (
    <FormControl
      className={classes.formControl}
      fullWidth={true}
      required={true}
    >
      <InputLabel htmlFor={`team-${teamNumber}-select`}>Select Team {teamNumber}</InputLabel>
      <Select
        native
        value={teamId}
        onChange={(event) => setTeamId(event.target.value)}
        inputProps={{
          id: `team-${teamNumber}-select`,
        }}
        required={true}
      >
        {/* <option aria-label="None" value="" /> */}
        <option aria-label="None" value="" />
          {/* <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option> */}
        {menuOptions}
      </Select>
    </FormControl>
  );
};

export default TeamSelector;
