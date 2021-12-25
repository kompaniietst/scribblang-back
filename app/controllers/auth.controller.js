const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

  // console.log('req', req.body)

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  console.log("USER");

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }



    // if (req.body.roles) {
    //   Role.find(
    //     {
    //       name: { $in: req.body.roles }
    //     },
    //     (err, roles) => {
    //       if (err) {
    //         res.status(500).send({ message: err });
    //         return;
    //       }

    //       user.roles = roles.map(role => role._id);
    //       user.save(err => {
    //         if (err) {
    //           res.status(500).send({ message: err });
    //           return;
    //         }

    //         // res.send({ message: "User was registered successfully!" });
    //         // res.send({ username: user.username, email: user.email });

    //         var token = jwt.sign({ id: user.id }, config.secret, {
    //           expiresIn: 86400 // 24 hours
    //         });

    //         // var authorities = [];

    //         // for (let i = 0; i < user.roles.length; i++) {
    //         //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    //         // }

    //         res.status(200).send({
    //           id: user._id,
    //           username: user.username,
    //           email: user.email,
    //           // roles: authorities,
    //           token: token
    //         });
    //       });
    //     }
    //   );
    // } else {

    Role.findOne({ name: "user" }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.roles = [role._id];
      user.save(err => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

        // console.log('        ==============            ');
        // console.log(jwt.sign({ id: "111" }, config.secret, {
        //   expiresIn: 86400 // 24 hours
        // }));
        // console.log('ID: ', user.id, config.secret, token);



        // var authorities = [];

        // for (let i = 0; i < user.roles.length; i++) {
        //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        // }
        console.log('singn up ', user._id);

        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          // roles: authorities,
          token: token
        });
        // res.send({ message: "User was registered successfully!" });
      });
    });
    // }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          token: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      // console.log('        ==============            ');

      // console.log(jwt.sign({ id: "111" }, config.secret, {
      //   expiresIn: 86400 // 24 hours
      // }));
      // console.log('ID: ', user.id, config.secret, token);

      var authorities = [];
      console.log('singn in ', user._id);
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        token: token
      });
    });
};