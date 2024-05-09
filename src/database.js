const mongoose = require("mongoose");

const { database } = require("./keys");

mongoose
  .connect(database.URI)
  .then((db) => console.log("Database is connected"))
  .catch((err) => console.error(err));
