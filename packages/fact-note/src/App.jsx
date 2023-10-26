import React, { useEffect, useState } from "react";
// import { fetchTx } from "./fetch-tx";

/**
 * A community notes style for Permaweb content built on top of fact markets.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.tx] - Optional string representing the transaction.
 * @returns {React.ReactNode} The rendered React component based on data and props.
 */
export const FactNote = ({ tx = "test" }) => {
  const [dataClone, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    /**
     * Fetches the data based on the 'tx' prop and sets it to the component state.
     * Sets the error state to 'true' if an error occurs during the data fetching process.
     */
    // const fetchData = () => {
    //   if (!error && !dataClone && data) {
    //     return setData(data);
    //   }
    //   if (!error && !data && tx) {
    //     fetchTx(tx)
    //       .then(setData)
    //       .catch((e) => setError(e.message));
    //   }
    // };
    // fetchData();
  }, [tx, error]);

  /**
   * Render the errorComponent if 'error' state is true, otherwise render a default error message.
   * @returns {React.ReactNode} The errorComponent or a default error message.
   */
  if (error) return errorComponent ? errorComponent : <p>An error occurred.</p>;

  /**
   * Render a message to prompt the user to pass a transaction ('tx') to the query string if 'data' and 'tx' props are not provided.
   * @returns {React.ReactNode} The message to prompt for 'tx' prop.
   */
  if (!data && !tx) return <p>Pass a tx to the query string</p>;

  /**
   * If 'child' prop is a valid React element, clone the element and pass 'dataClone' as the 'data' prop.
   * @returns {React.ReactNode} The cloned React element with 'dataClone' prop.
   */
  if (React.isValidElement(child)) {
    return React.cloneElement(child, { data: dataClone });
  }

  if (!React.isValidElement(child)) {
    return <p>INVALID</p>;
  }

  /**
   * Render the loadingComponent if provided, otherwise render a default loading message.
   * @returns {React.ReactNode} The loadingComponent or a default loading message.
   */
  return loadingComponent ? loadingComponent : <p>Loading...</p>;
};

export default FactNote;
