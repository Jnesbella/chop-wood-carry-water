import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import deepPurple from "@material-ui/core/colors/deepPurple";
import grey from "@material-ui/core/colors/grey";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple
  }
});

const useStyles = makeStyles(() => ({
  root: {
    background: grey[300]
  },
  content: {
    background: "white",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  }
}));

function AppContainer(props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <Container
        maxWidth="xs"
        component={Paper}
        className={classes.content}
        disableGutters
        fixed
      >
        {children}
      </Container>
    </MuiThemeProvider>
  );
};

export default AppContainer;
