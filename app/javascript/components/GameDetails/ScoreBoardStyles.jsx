import { red } from "@material-ui/core/colors";

const ScoreBoardStyles = (theme) => ({
  TableRow: {
    width: 90,
    paddingRight: 10,
  },
  teamNameRow: {
    '& tr:nth-child(1) > th': {
      // backgroundColor: theme.palette.team1Color.main,
      backgroundColor: "red",
      color: "white"
    },
    '& tr:nth-child(2) > th': {
      // backgroundColor: theme.palette.team2Color.main,
      backgroundColor: "yellow",
    },
  },
  teamName: {
    padding: '10px 3px',
    textAlign: 'center',
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
    padding: '8px 1px',
    textAlign: 'center',
    minWidth: 17,
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
  hammerIcon: {
    '&.MuiCardMedia-media': {
      width: 'auto',
    },
  }
});

export default ScoreBoardStyles;
