const crypto = require('crypto');

/**
 * Generates an HMAC using SHA3-256.
 * @param {string} key - The secret key.
 * @param {string} message - The message to hash.
 * @returns {string} - The generated HMAC.
 */
function generateHMAC(key, message) {
    return crypto.createHmac('sha3-256', key).update(message).digest('hex');
}

/**
 * Generates a secure random key.
 * @returns {string} - A random 32-byte hex key.
 */
function generateKey() {
    return crypto.randomBytes(32).toString('hex');
}

module.exports = { generateHMAC, generateKey };
