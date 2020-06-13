const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.characters = require("./character.model.js")(mongoose);
db.places = require("./place.model.js")(mongoose);

module.exports = db;