module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('role', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(32)
      },
    }); 
  
    return Role;
  };