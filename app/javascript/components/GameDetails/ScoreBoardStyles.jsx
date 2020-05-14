const ScoreBoardStyles = (theme) => ({
  TableRow: {
    width: 90,
    paddingRight: 10,
  },
  teamNameRow: {
    '& tr:nth-child(1) > th': {
      backgroundColor: theme.palette.team1Color.main,
    },
    '& tr:nth-child(2) > th': {
      backgroundColor: theme.palette.team2Color.main,
    },
  },
  teamName: {
    padding: '10px 3px',
    textAlign: 'left',
    border: '1px solid #aaaaaa',
  },
  tableCell: {
    padding: '10px 1px',
    textAlign: 'center',
    border: '1px solid #aaaaaa',
    '& input::-webkit-outer-spin-button': {
      appearance: 'none',
      margin: 0,
    },
    '& input::-webkit-inner-spin-button': {
      appearance: 'none',
      margin: 0,
    },
  },
  ends: {
    background: 'grey',
    color: '#ffffff',
    padding: '8px 1px',
    textAlign: 'center',
    border: '1px solid #aaaaaa',
  },
  letterSpace: {
    '& th:nth-child(11)': {
      letterSpacing: -2,
    },
    '& th:nth-child(12)': {
      letterSpacing: -2,
    },
  },
  root: {
    borderBottom: 'none',
    '& :before': {
      borderBottom: 'none',
    },
    '& :after': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottom: 'none',
    },
  },
  textInput: {
    '& .MuiInputBase-input': {
      textAlign: 'center',
    },
  },
});

export default ScoreBoardStyles;
