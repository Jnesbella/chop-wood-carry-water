import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import PropTypes from "prop-types";
import fp from "lodash/fp";

const LABEL = "volume";
const ADORNMENT = "reps";
const AMRAP = "AMRAP";
// const PLACEHOLDER = "e.g., 10, 10+, 8 - 12, 8 - 12+";
// const REP_REGEX = /^\s*(\d+)\s*$/im;
// const REP_RANGE_REGEX = /^\s*(\d+)\s*-?\s*(\d+)\s*$/im;

function VolumeInputReps(props) {
  const { min, max, amrap, ...theRest } = props;

  const getHelperText = () => {
    const hasMin = !(fp.isNil(min) || min.length === 0);
    const hasMax = !(fp.isNil(max) || max.length === 0);

    if (!hasMin && !hasMax && amrap) return AMRAP;
    if (!hasMin && !hasMax) return "";

    const beginning = hasMin ? min : "0";
    const middle = hasMax ? ` - ${max}` : "";
    const end = amrap || (hasMin && !hasMax) ? "+" : "";

    return `${beginning}${middle}${end}`;
  };

  return (
    <TextField
      // label={LABEL}
      placeholder=""
      InputLabelProps={{
        shrink: true // placeholder.length > 0
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{ADORNMENT}</InputAdornment>
        )
      }}
      helperText={getHelperText()}
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
  amrap: false
};

export default VolumeInputReps;
