import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import PropTypes from "prop-types";
import fp from "lodash/fp";

const LABEL = "intensity";
const ADORNMENT = "lbs";
const PERCENT = "%1RM";

function IntensityInputWeight(props) {
  const { percentOfOneRepMax, ...theRest } = props;

  const getHelperText = () => {
    if (fp.isNil(percentOfOneRepMax) || percentOfOneRepMax.length === 0)
      return "";
    return `${percentOfOneRepMax}${PERCENT}`;
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

IntensityInputWeight.protoTypes = {
  percentOfOneRepMax: PropTypes.number
};

IntensityInputWeight.defaultProps = {};

export default IntensityInputWeight;
