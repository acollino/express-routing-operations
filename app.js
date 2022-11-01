const express = require("express");
const routes = require("./src/routes");

const app = express();

app.use("/", routes);

app.listen(3000, function () {
  console.log("App on port 3000");
});
