import NodeCache from "node-cache";

// expire after 15 minutes
export const cache = new NodeCache( { stdTTL: 60 * 15 } ); 