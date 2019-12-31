import React from 'react';
import fp from "lodash/fp";
import PropTypes from "prop-types";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Header from '../Header';

function SelectLibraryItem(props) {
  const {
    onChange,
    onClose,
    onNext,
    value,
    libraryItems,
    disableNext,
  } = props;

  const handleChange = event => {
    onChange(event.target.value);
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
      >
        Create New
      </Header>
      <FormControl component="fieldset">
        <RadioGroup aria-label="create" name="create" value={value} onChange={handleChange}>
          {
            libraryItems.map(
              item => (
                <FormControlLabel
                  key={item.id}
                  value={item.id}
                  control={<Radio />}
                  label={item.label}
                />
              )
            )
          }
        </RadioGroup>
      </FormControl>
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
