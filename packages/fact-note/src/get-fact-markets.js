import { getEdges, getHost, getNode } from "./fetch-utils";
import Async from "./hyper-async";

const { fromPromise, of } = Async;

export const getFactMarkets = async (tx) =>
  of(getHost())
    .chain((host) => fromPromise(fetchFactMarkets)(tx, host))
    .toPromise();

/**
 * @description Gets 'tx' from the query string -- returns null if it doesn't exist
 * @example getTx(window?.location?.search);
 * @author @jshaw_ar
 * @param {string} queryString
 * @return {*} value of tx or null
 */
export async function fetchFactMarkets(tx, host) {
  const result = await fetch(`https://${host}/graphql`, {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.7",
      "content-type": "application/json",
    },
    body: `{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  transactions(\\n    first: 100\\n    tags: [{name: \\\"Data-Source\\\", values: [\\\"${tx}\\\"]}, {name: \\\"Contract-Src\\\", values: [\\\"eIAyBgHH-H7Qzw9fj7Austj30QKPQn27eaakvpOUSR8\\\"]}]\\n  ) {\\n    edges {\\n      node {\\n        block {\\n          timestamp\\n        }\\n        id\\n        owner {\\n          address\\n        }\\n        tags {\\n          name\\n          value\\n        }\\n      }\\n    }\\n  }\\n}\\n\"}`,
    method: "POST",
    mode: "cors",
    credentials: "omit",
  });

  if (result.ok) {
    return getEdges(await result.json()).map(getNode);
  }
  throw new Error("There was an error fetching the transaction.");
}
