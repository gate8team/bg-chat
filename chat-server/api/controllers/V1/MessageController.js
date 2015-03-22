/**
 * V1/MessageController
 *
 * @description :: Server-side logic for managing v1/messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) {
    Message.find().exec(function(error, chatMessages) {
      if (error) res.json({});
      else res.json(chatMessages);
    });
  },
  echo: function (req,res) {
    // Get the value of a parameter
    var param = req.param('message');

    // Send a JSON response
    res.json({
      success: true,
      message: param
    });
  }
};

