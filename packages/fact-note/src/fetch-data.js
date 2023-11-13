import { getHost } from "./fetch-utils";

import Async from "./hyper-async";

const { fromPromise, of } = Async;

export const fetchTx = async (tx) =>
  of(getHost())
    .chain((host) => fromPromise(fetchTxFromGateway)(tx, host))
    .toPromise();

/**
 * @description Gets 'tx' from the query string -- returns null if it doesn't exist
 * @example getTx(window?.location?.search);
 * @author @jshaw_ar
 * @param {string} queryString
 * @return {*} value of tx or null
 */
export async function fetchTxFromGateway(tx, host) {
  const result = await fetch(`https://${host}/${tx}`);
  if (result.ok) {
    return result.json();
  }
  throw new Error("There was an error fetching the transaction.");
}
