import NodeCache from "node-cache";

/**
 * In-memory cache instance.
 * 
 * Uses NodeCache to temporarily store data in memory.
 * Default TTL (time-to-live) is 15 minutes.
 *
 * @constant
 * @type {NodeCache}
 */
export const cache = new NodeCache({ stdTTL: 60 * 15 });

/**
 * Continue your code below this line.
 * 
 * Add custom cache configurations or helper functions if needed.
 * Example:
 * 
 * export function clearCache(key) {
 *   cache.del(key);
 * }
 */
