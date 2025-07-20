// Here we are connecting to database

const mongoose = require("mongoose");

/**
 * Connect to the MongoDB database.
 * @function connectToMongo
 * @returns {Promise} resolves when connected to the database, rejects if there is an error.
 */
const connectToMongo = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/movie_comment")
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { connectToMongo };
