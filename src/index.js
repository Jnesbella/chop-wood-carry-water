import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import createStore, { history } from "./Redux/store";

import "./index.css";

const store = createStore();

ReactDOM.render(<App store={store} history={history} />, document.getElementById("root"));
registerServiceWorker();
