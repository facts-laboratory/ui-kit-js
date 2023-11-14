/**
 * Gets the host to fetch using the gateway currently being used.
 *
 * @author @jshaw-ar
 * @return {*}
 */
export function getHost() {
  const urlObj = new URL(window.location.href);
  const host = urlObj.host;
  if (host.includes("localhost", "arweave.dev")) return "arweave.net";
  const hostParts = host.split(".");
  if (!(hostParts.length >= 2)) return "arweave.net";
  const domain =
    hostParts[hostParts.length - 2] + "." + hostParts[hostParts.length - 1];
  return domain;
}

export function getEdges(res) {
  if (!res?.data?.transactions?.edges) throw new Error("no edges");
  return res.data.transactions.edges;
}

/**
 * Pulls the node from the edge of the gql query response.
 *
 * @author @jshaw-ar
 * @param {{ node: Transaction }} edge
 * @return {*}  {Transaction}
 */
export function getNode(edge) {
  return edge.node;
}
