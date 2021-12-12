const mongoose = require("mongoose");

const SystemEntity = mongoose.model(
    "SystemEntity",
    new mongoose.Schema({
        name: String,
        path: [String],
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SystemEntityType"
        },
        createdAt: Date,
        uid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
);

module.exports = SystemEntity;