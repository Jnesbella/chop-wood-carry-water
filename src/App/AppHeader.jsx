import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from '@material-ui/icons/Menu';

function AppHeader(props) {

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="Menu">
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
