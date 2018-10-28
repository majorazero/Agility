const crypto = require("crypto");

module.exports = {
  encrypt: (cipher,root) => {
    let mykey = crypto.createCipher("aes-128-cbc",cipher);
    let token = mykey.update(root,'utf8','hex');
    token += mykey.final('hex');
    return token;
  }
};
