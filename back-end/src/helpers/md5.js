const md5 = require('md5');

module.exports = {
  hash: (password) => md5(password),
};
