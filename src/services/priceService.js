/**
 * priceService.js
 * Fetches live price data from the spreadsheet-backed APIs and groups it
 * into the three KISAGOLD product lines.
 *
 * Endpoints (configured via env):
 *   VITE_PRICE_API_URL        → https://kisagold-be.onrender.com/comparison-data
 *   VITE_PRICE_UPDATE_API_URL → https://hornet.agase.xyz/api/logs/last-update/
 *
 * Group rules (matched against priceData keys):
 *   KISA24 Classic 24K    → keys starting with "KISA24 24K"
 *   KISA24 Classic 999.9  → keys starting with "KISA24 999.9"
 *
 * Throws on any network or non-200 error — callers handle it.
 */

const PRICE_API_URL        = import.meta.env.VITE_PRICE_API_URL
const PRICE_UPDATE_API_URL = import.meta.env.VITE_PRICE_UPDATE_API_URL

// ==================== Key classifiers ====================
const isKisa24_24k  = (key) => /^KISA24\s+24K/i.test(key)
const isKisa24_999  = (key) => /^KISA24\s+999\.9/i.test(key)

// ==================== Weight extraction ====================
/**
 * Extracts the gram weight from a key string or its category label.
 * - "KISA24 25gr"                  → "25 gr"
 * - "KISAGOLD 999% (KISA24) 100gr" → "100 gr"
 * - "KISAGOLD 992% (Non Brand)" with category "Physical 1 gr" → "1 gr"
 */
const extractWeight = (key, category) => {
  const fromKey = key.match(/(\d+)\s*gr/i)
  if (fromKey) return `${fromKey[1]} gr`
  const fromCat = (category ?? '').match(/(\d+)\s*gr/i)
  if (fromCat) return `${fromCat[1]} gr`
  return null
}

// ==================== Row builder ====================
/**
 * Filters entries by keyMatcher, extracts weight, skips invalid prices,
 * and returns rows sorted by gram weight ascending.
 */
const buildRows = (priceData, keyMatcher) =>
  Object.entries(priceData)
    .filter(([key]) => keyMatcher(key))
    .reduce((acc, [key, val]) => {
      const weight = extractWeight(key, val.categories)
      if (!weight) return acc
      if (val.buyPrice == null || val.buybackPrice == null) return acc
      const grams = parseInt(weight, 10)
      acc.push({ weight, buyPrice: val.buyPrice, buybackPrice: val.buybackPrice, _g: grams })
      return acc
    }, [])
    .sort((a, b) => a._g - b._g)
    .map(({ _g, ...row }) => row)

// ==================== Group definitions ====================
const GROUP_DEFS = [
  {
    categoryId: 'classic-24k',
    label: { en: 'KISA24 Classic 24K', id: 'KISA24 Classic 24K' },
    matcher: isKisa24_24k
  },
  {
    categoryId: 'classic-999',
    label: { en: 'KISA24 Classic 999.9', id: 'KISA24 Classic 999.9' },
    matcher: isKisa24_999
  }
]

// ==================== Main export ====================
/**
 * Fetches live prices and last-update label, returns normalized groups.
 * Only groups with at least one valid row are included.
 * Throws on network / non-200 error — no static fallback.
 *
 * @returns {Promise<{
 *   groups: Array<{ categoryId: string, label: { en: string, id: string }, rows: Array }>,
 *   lastUpdate: string|null
 * }>}
 */
export const fetchPriceData = async () => {
  const [compRes, updateRes] = await Promise.all([
    fetch(PRICE_API_URL),
    fetch(PRICE_UPDATE_API_URL)
  ])

  if (!compRes.ok || !updateRes.ok) {
    throw new Error(`Price API error: ${compRes.status} / ${updateRes.status}`)
  }

  const [comparison, updateData] = await Promise.all([
    compRes.json(),
    updateRes.json()
  ])

  const priceData = comparison.priceData ?? {}

  const groups = GROUP_DEFS
    .map(def => ({ ...def, rows: buildRows(priceData, def.matcher) }))
    .filter(group => group.rows.length > 0)

  return {
    groups,
    lastUpdate: updateData.value ?? null   // e.g. "4 Feb 2026 11.00 WIB"
  }
}
