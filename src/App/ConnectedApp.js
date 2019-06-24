import { connect } from "react-redux";

import App from "./App";
import { loadData } from "../Redux/Data/data.actions";

const mapDispatchToProps = {
  onMount: loadData
};

export default connect(
  null,
  mapDispatchToProps
)(App);
