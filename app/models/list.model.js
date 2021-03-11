module.exports = (sequelize, Sequelize) => {
    const List = sequelize.define("list", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(32)
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      deleteData: {
        type: Sequelize.STRING,
        defaultValue: null
      }
    }); 
  
    return List;
  };