require("dotenv").config();
const Server = require("./app/server");
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 2000;

new Server(PORT, DB_URL);
