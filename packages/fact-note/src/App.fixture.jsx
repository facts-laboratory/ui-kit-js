import React from "react";
import App from "./App";
import { useValue } from "react-cosmos/client";

export default () => {
  const [tx, settx] = useValue("tx", {
    defaultValue: "<tx>",
    // defaultValue: "00px2DCGkrfdXUwurg98ea3aHdvpyBGdbahV4v9xihU",
  });

  return <App tx={tx} />;
};
