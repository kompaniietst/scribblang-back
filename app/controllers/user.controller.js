const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};


exports.currentUser = (req, res) => {
    console.log('curr user ', req.userId);

    User.findOne({
        _id: req.userId
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            // console.log('user ', user);
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }




            res.status(200).send({
                uid: user._id,
                username: user.username,
                email: user.email,
                // roles: authorities,
                // token: token
            });



        });


    // res.status(200).send("currentUser");
};
