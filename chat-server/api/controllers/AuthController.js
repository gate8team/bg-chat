/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  // basic registration goes here
  register: function(req, res) {
    //if (req.body.password !== req.body.confirmPassword) {
    //  return res.json(401, {err: 'Password doesn\'t match'});
    //}

    User.create({email: req.body.email, password: req.body.password}).exec(function(err, user) {
      if (err) {
        res.json(err.status, {err: err});
        return;
      }
      if (user) {
        res.json({user: user, token: sailTokenAuth.issueToken(user.id)});
      }
    });
  },
  // basic auth is here
  authenticate: function(req, res) {
    var email = req.param('email');
    var password = req.param('password');

    if (!email || !password) {
      return res.json(401, {err: 'email and password required'});
    }

    User.findOneByEmail(email, function(err, user) {
      if (!user) {
        return res.json(401, {err: 'invalid email or password'});
      }

      User.validPassword(password, user, function(err, valid) {
        if (err) {
          return res.json(403, {err: 'forbidden'});
        }

        if (!valid) {
          return res.json(401, {err: 'invalid email or password'});
        } else {
          res.json({user: user, token: sailTokenAuth.issueToken(user.id)});
        }
      });
    })
  }
};

