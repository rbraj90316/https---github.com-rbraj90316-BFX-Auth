const crypto = require('crypto');
// Encryption key and algorithm
const encryptionKey =  crypto.randomBytes(32); 
const algorithm = 'aes-256-cbc';
module.exports.encrypt = async function encrypt(buffer) {
    try {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv);
        const encryptedBuffer = Buffer.concat([cipher.update(buffer), cipher.final()]);
        const encryptedData = {
            iv: iv.toString('hex'),
            encryptedData: encryptedBuffer.toString('base64'),
        };
        return JSON.stringify(encryptedData);
    } catch (err) {
        throw new Error('Encryption failed');
    }
};
module.exports.decrypt = async function decrypt(encryptedString) {
    try {
        const decipher = crypto.createDecipher(algorithm, encryptionKey);
        const decryptedBuffer = Buffer.concat([decipher.update(Buffer.from(encryptedString, 'base64')), decipher.final()]);
        return decryptedBuffer;
    } catch (err) {
        throw new Error('Decryption failed');
    }
};
