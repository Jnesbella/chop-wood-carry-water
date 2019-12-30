import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from '@material-ui/icons/Menu';

function AppBarComponent(props) {
  const { children } = props;
  return (
    <AppBar position="sticky">
      <Toolbar>
        {children}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
