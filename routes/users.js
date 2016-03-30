var express = require('express');
var router = express.Router();

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

var users = {
  getAllUsers: function (req, res) {
    var me = this;
    console.log('Fetch all the users');
    res.status(200).send({ data: [
      { fname: 'Jean Luc', lname: "picard", age: "55" },
      { fname: 'Worf',     lname: "moghsson",  age: "22" },
      { fname: 'Deanna',   lname: "troi",    age: "33" },
      { fname: 'Data',     lname: "datarespect",        age: "44" }
    ]});

/*    me._getContacts(null, function (err, collecion) {
          if (err) {
            res.header("Content-Type", "application/json");
            res.status(500).send({
              success: false,
              message: new Error().stack
            });
          }
          else {
            res.header("Content-Type", "application/json");
            res.status(200).send(global.App.wrapresponse(collecion));
          }
        },
        me
    );*/
  },
  addUsers: function (req, res, next) {
    debugger;
  }
}



module.exports = users;
