const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function connectMongoDb(url) {
  // connect to mongodb database.
  return mongoose
    .connect(url)
    .then(() => console.log("Connection to mongodb successful."))
    .catch((err) => console.log("Mongo db connection error"));
}

module.exports = { connectMongoDb };
