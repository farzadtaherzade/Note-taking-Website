class Server {
  #express = require("express");
  #app = this.#express();
  constructor(port, db_url) {
    this.configDatabase(db_url);
    this.configureApp();
    this.congigRoutes();
    this.errorHandler();
    this.startApp(port);
  }
  configureApp() {
    const path = require("path");
    const morgan = require("morgan");
    const bodyParser = require("body-parser");
    const cors = require("cors");

    this.#app.use(
      this.#express.static(path.join(__dirname, "..", "public", "v1"))
    );
    this.#app.use(morgan("dev"));
    this.#app.use(bodyParser.json());
    this.#app.use(cors());
    this.#app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
  }
  configDatabase(db_url) {
    const mongoose = require("mongoose");
    mongoose
      .connect(db_url)
      .then(() => {
        console.log("Databse connected succesfully");
      })
      .catch((err) => {
        console.error("Database connection error: ", err);
      });
  }
  errorHandler() {
    this.#app.use("*", (req, res, next) => {
      const err = new Error(`Can't find ${req.originalUrl} on this server`);
      err.status = "fail";
      err.statusCode = 404;
      next(err);
    });
    this.#app.use((err, req, res, next) => {
      err.statusCode = err.statusCode || 500;
      err.status = err.status || "error";

      res.staus(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
      });
    });
  }
  congigRoutes() {
    const allRoutes = require("./router/routes");

    this.#app.use("/", (req, res, next) => {
      res.send("welcome Here");
    });

    this.#app.use("/v1/api", allRoutes);
  }
  startApp(port) {
    this.#app.listen(port, () => {
      console.log(`App listening on port ${port}!`);
    });
  }
}

module.exports = Server;
