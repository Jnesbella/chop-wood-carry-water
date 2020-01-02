import React from 'react';
import fp from "lodash/fp";
import PropTypes from "prop-types";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';

import Header from '../Header';

const useStyles = makeStyles(theme => {
  return {
    formControl: {
      padding: theme.spacing(2),
      paddingTop: theme.spacing(1),
    },
    radioGroup: {
      flexDirection: 'row',
    },
  };
});

function SelectLibraryItem(props) {
  const {
    onChange,
    onClose,
    onNext,
    value,
    libraryItems,
    disableNext,
  } = props;
  const classes = useStyles();

  const handleChange = event => {
    onChange(event.target.value);
  };

  const renderRadioButton = item => {
    return (
      <FormControlLabel
        key={item.id}
        label={item.label}
        value={item.id}
        control={<Radio/>}
      />
    );
  };

  return (
    <React.Fragment>
      <Header
        primaryAction='Next'
        onPrimaryAction={onNext}
        primaryActionProps={{
          disabled: disableNext,
        }}
        secondaryAction='Close'
        onSecondaryAction={onClose}
        p={2}
        pb={0}
      >
        Create New
      </Header>
      <Box p={2} pt={1}>
        <FormControl>
          <RadioGroup
            aria-label="create"
            name="create"
            value={value}
            onChange={handleChange}
            className={classes.radioGroup}
          >
            {libraryItems.map(renderRadioButton)}
          </RadioGroup>
        </FormControl>
      </Box>
    </React.Fragment>
  );
};

SelectLibraryItem.propTypes = {
  onClose: PropTypes.func,
  onNext: PropTypes.func,
  onChange: PropTypes.func,
  disableNext: PropTypes.bool,
};

SelectLibraryItem.defaultProps = {
  onClose: fp.noop,
  onNext: fp.noop,
  onChange: fp.noop,
  disableNext: false,
};

export default SelectLibraryItem;
