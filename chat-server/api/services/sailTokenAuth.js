var jwt = require('jsonwebtoken');

module.exports = {
  issueToken: function(payload) {
    var token = jwt.sign(payload, process.env.TOKEN_SECRET || "some-default-token-goes-here");
    return token;
  },
  verifyToken: function(token, verified) {
    return jwt.verify(token, process.env.TOKEN_SECRET || "some-default-token-goes-here", {}, verified);
  }
};
