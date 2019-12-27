import React from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import fp from "lodash/fp";
import Close from '@material-ui/icons/Close';

const LABEL = "lbs";
// const PLACEHOLDER = "e.g., 125, =TM, =1RM, =65%TM, =90%1RM";

export const PERCENT_OF_TRAINING_FUNC = "PERCENT_OF_TRAINING";
export const DIGIT_FUNC = "DIGIT_FUNC";
export const EMPTY_FUNC = "EMPTY_FUNC";

const PERCENT_OF_TRAINING_MAX_REGEXP = /^\s*=(\d+)%TM\s*$/;
const DIGIT_REGEXP = /^\s*(\d+)\s*$/;
const EMPTY_REGEXP = /^\s*$/;

const FUNCS = [
  {
    test: value => PERCENT_OF_TRAINING_MAX_REGEXP.test(value),
    name: PERCENT_OF_TRAINING_FUNC,
    parseValue: value => {
      const percent = PERCENT_OF_TRAINING_MAX_REGEXP.exec(value)[1];
      return {
        percent
      };
    }
  },
  {
    test: value => DIGIT_REGEXP.test(value),
    name: DIGIT_FUNC,
    parseValue: value => {
      const digit = DIGIT_REGEXP.exec(value)[1];
      return {
        digit
      };
    }
  },
  {
    test: value => EMPTY_REGEXP.test(value),
    name: EMPTY_FUNC,
    parseValue: fp.noop
  }
];

const getChangeValue = value => {
  const { name: funcName, parseValue } =
    FUNCS.find(func => func.test(value)) || {};

  if (funcName) {
    return {
      valid: true,
      value,
      func: funcName,
      ...(parseValue(value) || {}),
    };
  }

  return {
    valid: false,
    value,
    func: undefined
  };
};

const getHelperText = (value) => {
  const { func } = value;

  if (func === PERCENT_OF_TRAINING_FUNC) {
    const { percent } = value;
    return `${percent}%TM`;
  }

  return "";
};

function IntensityInputWeight(props) {
  const { value, onChange, ...theRest } = props;

  const [internalValue, setInternalValue] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [helperText, setHelperText] = React.useState(null);

  React.useEffect(() => {
    if (focused) return;

    const val = getChangeValue(internalValue);
    setHelperText(getHelperText(val));
    onChange(val);
  }, [focused]);

  const handleChange = event => {
    if (!focused) return;

    const { value } = event.target;
    setInternalValue(value);
  };

  const handleFocus = () => { setFocused(true); };

  const handleBlur = () => { setFocused(false); };

  const handleClearInput = () => {
    setInternalValue('');
  };

  const endAdornment = focused && (
    <InputAdornment position="end">
      <IconButton
        aria-label="clear input"
        onClick={handleClearInput}
        edge="end"
        size="small"
      >
        <Close />
      </IconButton>
    </InputAdornment>
  );

  return (
    <TextField
      label={LABEL}
      // placeholder={PLACEHOLDER}
      InputLabelProps={{
        shrink: true, // placeholder.length > 0
      }}
      InputProps={{
        endAdornment,
      }}
      helperText={helperText}
      value={focused ? internalValue : ""}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...theRest}
    />
  );
}

IntensityInputWeight.protoTypes = {
  percentOfOneRepMax: PropTypes.number
};

IntensityInputWeight.defaultProps = {
  onChange: fp.noop,
};

export default IntensityInputWeight;
