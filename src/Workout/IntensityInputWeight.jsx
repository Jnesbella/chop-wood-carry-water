import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import PropTypes from "prop-types";
import fp from "lodash/fp";

// const LABEL = "intensity";
// const ADORNMENT = "lbs";

const LABEL = "lbs";

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
      ...parseValue(value)
    };
  }

  return {
    valid: false,
    value,
    func: undefined
  };
};

function IntensityInputWeight(props) {
  const { value, onChange, ...theRest } = props;

  const [internalValue, setInternalValue] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [changeValue, setChangeValue] = React.useState({});

  React.useEffect(() => {
    if (focused) return;

    const val = getChangeValue(internalValue);
    setChangeValue(val);
    onChange(val);
  }, [focused]);

  const getHelperText = () => {
    const { func } = changeValue;

    if (func === PERCENT_OF_TRAINING_FUNC) {
      const { percent } = changeValue;
      return `${percent}%TM`;
    }

    return "";
  };

  const handleChange = event => {
    if (!focused) return;

    const { value } = event.target;
    setInternalValue(value);
  };

  const handleFocus = () => setFocused(true);

  const handleBlur = () => setFocused(false);

  return (
    <TextField
      label={LABEL}
      placeholder=""
      InputLabelProps={{
        shrink: true // placeholder.length > 0
      }}
      // InputProps={{
      //   endAdornment: (
      //     <InputAdornment position="end">{ADORNMENT}</InputAdornment>
      //   )
      // }}
      helperText={getHelperText()}
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

IntensityInputWeight.defaultProps = {};

export default IntensityInputWeight;
