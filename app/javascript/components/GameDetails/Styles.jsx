const Styles = {
  table: {
    // minWidth: 650,
  },
  TableRow: {
    width: 90,
    paddingRight: 10,
  },
  teamNameRow: {
    '& tr:nth-child(1) > th': {
      backgroundColor: 'red'
    },
    '& tr:nth-child(2) > th': {
      backgroundColor: 'yellow'
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
    letterSpacing: -2,
  },
  textInput: {
    '&:focus': {},
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:before': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:after': {
      borderBottom: 'none',
    },
    '& .MuiInputBase-input': {
      textAlign: 'center',
    },
  },
};

export default Styles;
