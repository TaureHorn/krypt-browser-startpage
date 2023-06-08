const bcrypt = require("bcryptjs");

exports.authenticate = async function (req, res) {
  const pass = {
    full: req.body.str,
    leader: req.body.str.slice(0, 12),
  };
  bcrypt.compare(pass.leader, process.env.HASH, function (err, result) {
    if (result === true) {
      console.log(`bcrypt hash comparison has returned true`);
      res.status(200).send(process.env.TOKEN);
    } else if (result === false) {
      console.log(`bcrypt hash comparison has returned false`);
      res.status(401).end();
    } else {
      console.log(err);
    }
  });
};
