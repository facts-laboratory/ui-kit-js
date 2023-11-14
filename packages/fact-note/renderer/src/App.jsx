import { connect } from "react-redux";
import { mapStateToProps } from "./store/router";

import loadable from "@loadable/component";

const pages = {
  Home: loadable(() => import("./pages/Notes"), {
    resolveComponent: (c) => c.default,
  }),
  Notes: loadable(() => import("./pages/Notes"), {
    resolveComponent: (c) => c.default,
  }),
};

function App({ page }) {
  const Component = pages[page || "Home"];
  return (
    <>
      <Component />
    </>
  );
}

export default connect(mapStateToProps)(App);
