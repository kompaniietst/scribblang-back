const config = require("../config/auth.config");
const db = require("../models");

const Word = db.word;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.allWords = (req, res) => {
    Word.find().exec((err, result) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.status(200).send(result);
    })
}

exports.save = (req, res) => {

    // console.log('---------------------------------req', req.body)


    // if (!req.body.word) {
    //     return res.status(500).send({ message: err });
    // }

    const word = new Word({
        word: req.body.word,
        translation: req.body.translation,
        transcription: req.body.transcription,
        uid: "614b6b48ccfca2f3a8356f9c",
        path: req.body.path,
        createdAt: new Date()
    });

    word.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.status(200).send(word);
    });
    // res.status(200).send("word");
};
