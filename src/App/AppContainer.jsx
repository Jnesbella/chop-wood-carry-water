import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import deepPurple from "@material-ui/core/colors/deepPurple";
import grey from "@material-ui/core/colors/grey";

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
    background: "white"
  }
}));

function AppContainer(props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <Container maxWidth="xs">
          <Paper square className={classes.content}>
            {children}
          </Paper>
        </Container>
      </MuiThemeProvider>
    </div>
  );
};

export default AppContainer;
