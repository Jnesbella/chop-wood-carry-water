import React from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import fp from "lodash/fp";

const LABEL = "reps";
// const PLACEHOLDER = "e.g., 10, 10+, 8 - 12, 8 - 12+";
// const REP_REGEX = /^\s*(\d+)\s*$/im;
// const REP_RANGE_REGEX = /^\s*(\d+)\s*-?\s*(\d+)\s*$/im;

function VolumeInputReps(props) {
  const { min, max, amrap, ...theRest } = props;

  const [valid, setValid] = React.useState(true);

  const getPlaceholder = () => {
    const hasMin = !fp.isNil(min);
    const hasMax = !fp.isNil(max);

    if (!hasMin && !hasMax) return "";

    const beginning = hasMin ? min : "0";
    const middle = hasMax ? ` - ${max}` : "";
    const end = amrap || (hasMin && !hasMax) ? "+" : "";

    return `${beginning}${middle}${end}`;
  };

  return (
    <TextField
      placeholder={getPlaceholder()}
      label={LABEL}
      error={!valid}
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
