const mongoose = require("mongoose");

const Word = mongoose.model(
    "Word",
    new mongoose.Schema({
        word: String,
        translation: String,
        transcription: String,
        uid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        path: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SystemEntity"
        },
        createdAt: Date
    })
);

module.exports = Word;