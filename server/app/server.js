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
    const options = {
      failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Hello World",
          version: "1.0.0",
        },
        servers: [
          {
            url: "http://localhost:8000",
          },
        ],
      },
      apis: ["./app/router/*.js"],
    };

    const { url } = require("inspector");
    const swaggerJSDoc = require("swagger-jsdoc");
    const swaggerSpec = swaggerJSDoc(options);
    const swaggerUi = require("swagger-ui-express");

    this.#app.use("/api-docs", swaggerUi.serve);
    this.#app.get("/api-docs", swaggerUi.setup(swaggerSpec));

    this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
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

      res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
      });
    });
  }
  congigRoutes() {
    const { allRoutes } = require("./router/routes");

    this.#app.use("/api/v1", allRoutes);
  }
  startApp(port) {
    this.#app.listen(port, () => {
      console.log(`App listening on port ${port}!`);
    });
  }
}

module.exports = Server;
