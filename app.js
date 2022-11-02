const express = require("express");
const routes = require("./src/routes");

const app = express();

app.use("/", routes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Unspecified error";

  return res.status(status).json({
    error: { message, status },
  });
});

if (require.main === module) {
  app.listen(3000, () => {
    console.log("App on port 3000");
  });
}

module.exports = app;
