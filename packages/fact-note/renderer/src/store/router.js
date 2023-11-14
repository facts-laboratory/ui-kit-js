import { NOT_FOUND } from "redux-first-router";

const components = {
  HOME: "Home",
  NOTES: "Notes",
  [NOT_FOUND]: "Home",
};

export const routesMap = {
  HOME: {
    path: "/",
    thunk: async (dispatch, getState) => {
      console.log("Home thunk.");
    },
  },
  NOTES: {
    path: "/notes/:tx",
    thunk: async (dispatch, getState) => {
      console.log("Notes thunk.");
    },
  },
  NOT_FOUND: {
    path: "/",
  },
};

export const router = (dispatch) => {
  return {
    goBack: () => back(),
    goToHome: () => dispatch({ type: "HOME" }),
    goToNotes: (tx) => dispatch({ type: "NOTES", payload: { tx } }),
  };
};

export const mapStateToProps = (state, props) => {
  return {
    ...props,
    page: state.page,
    tx: state?.location?.payload?.tx,
    ticker: state?.location?.payload?.ticker,
    transaction: state?.location?.payload?.transaction,
  };
};

export default (state = "HOME", action = {}) =>
  components[action.type] || state;
