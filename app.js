const express = require("express");
const initDatabase = require("./src/config/models.initial");
require("dotenv").config();
const port = process.env.PORT;

async function main() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  await initDatabase();
  app.use((req, res, next) => {
    return res.status(404).json({ 
      messsage: "not found route",
    });
  });
  app.use((err, req, res, next) => {
    const status = err?.status ?? 500;
    const message = err?.message ?? "internal server error";
    return res.status(status).json({
      messsage,
    });
  });
  app.listen(3000, () => {
    console.log(`connected to server On :http://127.0.0.1:${port}`);
  });
}
main();
