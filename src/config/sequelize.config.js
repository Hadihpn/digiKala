const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "mariadb",
  host: process.env.DB_HOST,
  port: process,
  username: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
});
sequelize
  .authenticate()
  .then(() => {
    console.log("connected to mariaDb");
  })
  .catch((err) => {
    console.log("cannot connect to db");
    console.log(err);
  });
module.exports = sequelize;
