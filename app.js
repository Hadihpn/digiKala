const express = require("express");
const initDatabase = require("./src/config/models.initial");
const { mainRoutes } = require("./src/mainRoutes.routes");
require("dotenv").config();
const port = process.env.PORT;

// async function main() {
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initDatabase();
app.use(mainRoutes);
app.use((req, res, next) => {
  return res.status(404).json({
    messsage: "not found route",
  });
});
app.use((err, req, res, next) => {
  const status = err?.status ?? err?.statusCode ?? 500;
  let message = err?.message ?? "internal server error";
  console.log(err.name);
  
  if (err?.name == "ValidationError") {
    const { details } = err;
    message=""
    message = details?.body?.[0]?.message ?? "internal server error";
  }
  return res.status(status).json({
    message,
    err
  });
});
app.listen(port, () => {
  console.log(`connected to server On :http://127.0.0.1:${port}`);
});
// }
// main();
