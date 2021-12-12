const mongoose = require("mongoose");

const SystemEntityType = mongoose.model(
    "SystemEntityType",
    new mongoose.Schema({
        name: String
    })
);

module.exports = SystemEntityType;