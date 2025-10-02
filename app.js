const express = require("express");
const cors = require("cors");
const Routes = require("./routes");
const swaggerUi = require("swagger-ui-express");

class App {
  app = null;
  constructor() {
    this.app = express();
    this.init();
    this.routes();
    this.swaggerUi();
  }

  init() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
  }

  swaggerUi() {
    this.app.use(express.static("public"));
    const swaggerDocument = require("./public/swagger.json");
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  routes() {
    new Routes(this.app);
  }
}

module.exports = new App().app;
