const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,
//   // dialectOptions: {
//   //   ssl: {
//   //     require: true, // This will help you. But you will see nwe error
//   //     rejectUnauthorized: false // This line will fix new error
//   //   }
//   // },
// });

const sequelize = new Sequelize(ENV['DB'], ENV['USER'], ENV['PASSWORD'], {
  host: ENV['HOST'],
  dialect: ENV['dialect'],
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