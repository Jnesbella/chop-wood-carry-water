import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LibraryIcon from '@material-ui/icons/Collections';
import SearchIcon from '@material-ui/icons/Search';
import ProfileIcon from '@material-ui/icons/Face';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import fp from 'lodash/fp';

function createNavigationAction(label, pathname, icon) {
  return {
    label,
    pathname,
    icon,
    id: fp.kebabCase(label),
  };
};

export const NAVIGATION_ACTIONS = [
  createNavigationAction('Library', '/library', LibraryIcon),
  createNavigationAction('Search', '/search', SearchIcon),
  createNavigationAction('Profile', '/profile', ProfileIcon),
];

function BottomNavigationComponent(props) {
  const { history } = props;
  const pathname = useSelector(state => state.router.location.pathname);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(NAVIGATION_ACTIONS.findIndex(action => action.pathname === pathname));
  }, [pathname]);

  const renderNavigationActions = () => {
    return NAVIGATION_ACTIONS.map(action => {
      const { label, icon: Icon, id } = action;
      return (
        <BottomNavigationAction
          label={label}
          icon={<Icon />}
          key={id}
        />
      );
    })
  };

  return (
    <BottomNavigation
      onChange={(event, newValue) => {
        history.push(NAVIGATION_ACTIONS[newValue].pathname);
      }}
      showLabels
      value={value}
    >
      {renderNavigationActions()}
    </BottomNavigation>
  );
};

export default BottomNavigationComponent;
