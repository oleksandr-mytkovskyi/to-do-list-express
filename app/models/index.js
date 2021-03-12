const dotenv = require('dotenv');
const Sequelize = require("sequelize");

dotenv.config();

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.dialect,
  operatorsAliases: false,
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false // This line will fix new error
    }
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.list = require("./list.model.js")(sequelize, Sequelize);

module.exports = db;