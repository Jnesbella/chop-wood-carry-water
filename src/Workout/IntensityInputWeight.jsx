import React from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import fp from "lodash/fp";

const LABEL = "lbs";
const PERCENT = "%";

function IntensityInputWeight(props) {
  const { percentOfOneRepMax, ...theRest } = props;

  const getPlaceholder = () => {
    if (fp.isNil(percentOfOneRepMax) || percentOfOneRepMax.length === 0)
      return "";
    return `${percentOfOneRepMax}${PERCENT}`;
  };

  const placeholder = getPlaceholder();

  return (
    <TextField
      placeholder={placeholder}
      label={LABEL}
      InputLabelProps={{
        shrink: true // placeholder.length > 0
      }}
      {...theRest}
    />
  );
}

IntensityInputWeight.protoTypes = {
  percentOfOneRepMax: PropTypes.number
};

IntensityInputWeight.defaultProps = {};

export default IntensityInputWeight;
