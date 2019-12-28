import React from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import fp from "lodash/fp";
import Close from '@material-ui/icons/Close';
import { makeStyles } from "@material-ui/core/styles";

const AMRAP = "AMRAP";
const LABEL = "reps";

export const REP_RANGE_FUNC = "REP_RANGE_FUNC";
// export const DIGIT_FUNC = "DIGIT_FUNC";
export const EMPTY_FUNC = "EMPTY_FUNC";
export const AMRAP_FUNC = "AMRAP_FUNC";

const useStyles = makeStyles(theme => ({
  helperText: {
    marginBottom: theme.spacing(-2.5)
  }
}));

// const PLACEHOLDER = "e.g., 10, =10+, =8-12, =8-12+";
// const REP_REGEX = /^\s*(\d+)\s*$/im;
// const REP_RANGE_REGEX = /^\s*(\d+)\s*-?\s*(\d+)\s*(\+)?\s*$/im;
const IS_FUNC_REGEX = /^\s*=(.+)$/im;
const REP_RANGE_REGEX = /^\s*(\d+)\s*(-\s*(\d+))?\s*(\+)?\s*$/im;
const EMPTY_REGEXP = /^\s*$/;
const AMRAP_REGEX = /^\s*AMRAP\s*$/im;

const FUNCS = [
  {
    test: value => AMRAP_REGEX.test(value),
    name: AMRAP_FUNC,
    parseValue: () => ({ amrap: true }),
  },
  {
    test: value => REP_RANGE_REGEX.test(value),
    name: REP_RANGE_FUNC,
    parseValue: value => {
      const matches = REP_RANGE_REGEX.exec(value);
      const min = parseInt(matches[1], 10);
      const max = parseInt(matches[3], 10);
      const amrap = !!matches[4];

      return {
        min,
        max: isNaN(max) ? undefined : max,
        amrap,
      };
    },
  },
  {
    test: value => EMPTY_REGEXP.test(value),
    name: EMPTY_FUNC,
    parseValue: fp.noop,
  }
];

const getChangeValue = input => {
  const isFunc = IS_FUNC_REGEX.test(input);
  const funcInput = isFunc ? IS_FUNC_REGEX.exec(input)[1] : null;
  const func = isFunc ? FUNCS.find(func => func.test(funcInput)) : null;

  const {
    name: funcName,
    parseValue,
  } = func || { parseValue: fp.noop };

  return {
    value: input,
    func: funcName,
    ...(parseValue(funcInput) || {})
  };
};

const getHelperText = value => {
  const { func } = value;
  
  if (func === AMRAP_FUNC) {
    return 'AMRAP';
  }

  if (func === REP_RANGE_FUNC) {
    const { min, max, amrap } = value;

    const hasMin = !(fp.isNil(min) || min.length === 0);
    const hasMax = !(fp.isNil(max) || max.length === 0);

    if (!hasMin && !hasMax && amrap) return AMRAP;
    if (!hasMin && !hasMax) return "";

    const beginning = hasMin ? min : "0";
    const middle = hasMax ? ` - ${max}` : "";
    const end = amrap || (hasMin && !hasMax) ? "+" : "";

    return `${beginning}${middle}${end}`;
  }

    return "";
};

function VolumeInputReps(props) {
  const { value, onChange, ...theRest } = props;
  const classes = useStyles();

  const [internalValue, setInternalValue] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [helperText, setHelperText] = React.useState(null);

  React.useEffect(() => {
    if (focused) {
      setHelperText('');
      return;
    };

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
      FormHelperTextProps={{ classes: { root: classes.helperText } }}
      value={focused ? internalValue : ""}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...theRest}
    />
  );
}

VolumeInputReps.protoTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  amrap: PropTypes.bool
};

VolumeInputReps.defaultProps = {
  onChange: fp.noop,
};

export default VolumeInputReps;
