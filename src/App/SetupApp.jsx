import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";

import { loadData } from "../Redux/Data/data.actions";

function SetupApp() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadData())
  });

  return null;
};

export default SetupApp;
