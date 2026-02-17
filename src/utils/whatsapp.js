/**
 * WhatsApp contact utility
 * Opens the company WhatsApp in a new tab.
 * Number: +62 851-6888-8877
 */

const WHATSAPP_NUMBER = '6285168888877'

/**
 * Opens WhatsApp in a new tab.
 * @param {string} [message] - Optional pre-filled message text
 */
export const openWhatsApp = (message = '') => {
  const query = message ? `?text=${encodeURIComponent(message)}` : ''
  const url = `https://wa.me/${WHATSAPP_NUMBER}${query}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
