const cache = new Map()

export async function cachedFetch(url, options = {}, ttlMs = 30000) {
  const key = url + JSON.stringify(options)

  // Return cached data if fresh
  if (cache.has(key)) {
    const { data, ts } = cache.get(key)
    if (Date.now() - ts < ttlMs) {
      return data
    }
  }

  const res  = await fetch(url, options)
  const data = await res.json()

  // Only cache successful GET requests
  if (data.success && (!options.method || options.method === 'GET')) {
    cache.set(key, { data, ts: Date.now() })
  }

  return data
}

export function invalidateCache(url) {
  for (const key of cache.keys()) {
    if (key.startsWith(url)) {
      cache.delete(key)
    }
  }
}

export function clearCache() {
  cache.clear()
}