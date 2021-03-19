const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config();

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  operatorsAliases: 0,
  // dialectOptions: {
  //   ssl: {
  //     require: true, // This will help you. But you will see nwe error
  //     rejectUnauthorized: false // This line will fix new error
  //   }
  // },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.list = require('./list.model.js')(sequelize, Sequelize);
db.role = require('./role.model.js')(sequelize, Sequelize);
db.user = require('./user.model.js')(sequelize, Sequelize);
db.refreshToken = require('./refreshToken.model.js')(sequelize, Sequelize);

db.role.belongsTo(db.user, {
  foreignKey: {
    name: 'roleId'
  }
});

db.refreshToken.belongsTo(db.user, {
  foreignKey: {
    name: 'userId'
  }
});

module.exports = db;