const GameInfoStyles = (theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  gameInfo: {
    fontFamily: theme.typography.fontFamily,
  },
  teamNames: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 400,
  },
});

export default GameInfoStyles;