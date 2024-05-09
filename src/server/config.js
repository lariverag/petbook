const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const multer = require("multer");

const routes = require("../routes/index");

module.exports = (app) => {
  // Settings
  app.set("port", process.env.PORT || 3000);
  app.set("views", path.join(__dirname, "views"));
  app.engine(
    ".hbs",
    exphbs({
      defaultLayout: "main",
      layoutsDir: path.join(app.get("views"), "layouts"),
      partialsDir: path.join(app.get("views"), "partials"),
      extname: ".hbs",
      helpers: require("./helpers"),
    })
  );

  app.set("view engine", ".hbs");

  //middlewares

  app.use(morgan("dev"));
  app.use(
    multer({ dest: path.join(__dirname, "../public/upload/temp") }).single(
      "image"
    )
  );

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json()); //para entender los objetos me va a permitir refresacar los likes

  //routes
  routes(app);

  //static files

  app.use("/public", express.static(path.join(__dirname, "../public")));

  // errohandlers

  return app;
};
