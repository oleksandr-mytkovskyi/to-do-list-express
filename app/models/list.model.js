module.exports = (sequelize, Sequelize) => {
    const List = sequelize.define("list", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
    });
  
    return List;
  };