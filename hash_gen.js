const crypto = require('crypto');
const hash = crypto.createHash('sha256').update('DaniCoche').digest('hex');
console.log(hash);
