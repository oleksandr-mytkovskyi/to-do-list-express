module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: Sequelize.STRING(32)
      },
      email: {
        type: Sequelize.STRING(32),
        // defaultValue: false
      },
      password: {
        type: Sequelize.STRING(256),
        // defaultValue: false
      },
      roleId: {
        type: Sequelize.INTEGER,
        defaultValue: 3
      },
    }); 
  
    // User.associate = function(models) {
    //   User.belongsTo(models.role, {foreignKey: 'roleId', as: 'id'});
    // };
    return User;
  };